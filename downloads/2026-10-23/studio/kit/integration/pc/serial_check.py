"""One local serial owner; no web dashboard, automatic motor arming or port scan."""
import argparse
import json
import time

def decode_state(raw):
    value=json.loads(raw)
    if not isinstance(value,dict) or value.get('v')!=1:
        raise ValueError('unsupported protocol')
    if value.get('type') not in ('state','ack','error'):
        raise ValueError('unsupported message type')
    request=value.get('request')
    if type(request) is not int or not 0<=request<=65535:
        raise ValueError('invalid request')
    if value['type']=='state' and value.get('profile') not in ('P01','P02','P03','P04'):
        raise ValueError('unknown profile')
    return value

def send_once(port,command,expected_profile,timeout=4):
    # No retry of output commands: a lost ack must not repeat a motor move.
    if '\n' in command or '\r' in command or len(command)>65:
        raise ValueError('command must be one short line')
    port.write(('1 STATUS\n').encode('ascii'))
    deadline=time.monotonic()+timeout
    while time.monotonic()<deadline:
        raw=port.readline()
        if not raw:continue
        try:message=decode_state(raw)
        except (ValueError,UnicodeError):continue
        if message['type']=='state' and message['request']==1:
            if message['profile']!=expected_profile:raise ValueError('profile mismatch; no output command sent')
            break
    else:raise TimeoutError('STATUS timed out; no output command sent')
    port.write(('2 '+command+'\n').encode('ascii'))
    deadline=time.monotonic()+timeout
    while time.monotonic()<deadline:
        raw=port.readline()
        if not raw:continue
        try:message=decode_state(raw)
        except (ValueError,UnicodeError):continue
        if message['request']==2:return message
    raise TimeoutError('command response timed out; do not assume applied or resend automatically')

def main():
    p=argparse.ArgumentParser(description='Close Arduino Serial Monitor before opening a port.')
    p.add_argument('--port',required=True,help='Actual connected COM port; no scanning')
    p.add_argument('--profile',choices=['P01','P02','P03','P04'],required=True)
    p.add_argument('--command',default='STATUS',help='Example: LED 1. Motors remain blocked in the default build.')
    args=p.parse_args()
    import serial
    with serial.Serial(args.port,115200,timeout=0.25) as port:
        time.sleep(2) # UNO commonly resets when the port opens.
        port.reset_input_buffer()
        result=send_once(port,args.command,args.profile)
        print(json.dumps(result,ensure_ascii=False))
        if result['type']=='error':raise SystemExit(2)

if __name__=='__main__':main()
