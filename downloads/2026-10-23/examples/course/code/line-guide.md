# 완성 코드 전체와 모든 줄의 뜻

실행 위치는 이 날짜의 `examples/course` 폴더입니다. 파일을 저장하는 일과 Python으로 실행하는 일을 구분합니다. 새 함수를 처음부터 설계하기보다 입력·처리·출력과 한 값 수정을 먼저 확인합니다.

코드의 작은 수정을 할 때는 code 파일을 work 폴더에 같은 이름으로 복사하고 `python -X utf8 work/파일이름.py`로 실행합니다. data·code·work의 상대 배치를 유지하면 제공 경로가 이어집니다. 설정 파일을 바꾸는 활동은 해당 work/settings.json만 수정합니다.

## 01_ohm.py

조건: Python 3 표준 라이브러리만 사용합니다. 장치·포트·전원을 연결하지 않습니다.

실행: `python -X utf8 code/01_ohm.py`

```python
voltage_v = 3.3
resistance_ohm = 330
if resistance_ohm <= 0:
    raise ValueError("저항은 양수여야 합니다")
current_a = voltage_v / resistance_ohm
current_ma = current_a * 1000
print("current_mA:", round(current_ma, 2))
```

| 줄 | 코드의 뜻 |

|---:|---|

| 1 | 가정한 저항 양단의 전압을 V 단위로 저장합니다. |

| 2 | 가정한 저항을 Ω 단위로 저장합니다. |

| 3 | 0 또는 음수 저항 입력인지 확인합니다. |

| 4 | 이 계산의 범위를 벗어나므로 오류로 멈춥니다. |

| 5 | 옴의 법칙 I=V/R로 전류 A를 계산합니다. |

| 6 | A를 mA로 바꾸기 위해 1000을 곱합니다. |

| 7 | 소수 둘째 자리로 반올림해 출력합니다. |

예상 또는 실제 확인 결과:

```text
current_mA: 10.0
```

한 값 바꾸기: 저항을 660으로 바꾸면 5.0mA입니다. 전압은 3.3V를 유지합니다.

오류 해결: 저항0은 단락 모사 결과가 아니라 입력 오류입니다. 실제 단락을 만들어 확인하지 않습니다.

## 02_sensor_replay.py

조건: Python 3 표준 라이브러리만 사용합니다. 장치·포트·전원을 연결하지 않습니다.

실행: `python -X utf8 code/02_sensor_replay.py`

```python
import json
from pathlib import Path
root = Path(__file__).resolve().parent.parent
source = root / "data" / "sensor_samples.json"
samples = json.loads(source.read_text(encoding="utf-8"))
for sample in samples:
    value = sample["temperature_c"]
    if value is None:
        state = "missing"
    elif type(value) not in (int, float):
        state = "invalid"
    elif value >= 28.0:
        state = "alert"
    else:
        state = "normal"
    print(sample["seq"], value, state)
```

| 줄 | 코드의 뜻 |

|---:|---|

| 1 | JSON 문자열을 Python 값으로 바꾸는 도구를 가져옵니다. |

| 2 | 파일 경로 도구를 가져옵니다. |

| 3 | 현재 코드 위치에서 course 폴더를 찾습니다. |

| 4 | 가상 센서 입력 파일의 경로를 만듭니다. |

| 5 | UTF-8 파일을 읽고 리스트로 풉니다. |

| 6 | 기록을 순서대로 하나씩 읽습니다. |

| 7 | 이번 기록의 온도 값을 꺼냅니다. |

| 8 | 값 없음 None인지 먼저 확인합니다. |

| 9 | 미측정 상태를 정합니다. |

| 10 | 정수나 실수가 아닌 자료형인지 검사합니다. bool도 제외합니다. |

| 11 | 문자 등 잘못된 형식이면 invalid로 구분합니다. |

| 12 | 유효한 수가 경계 28.0 이상인지 비교합니다. |

| 13 | 경계 이상은 alert라는 표시 상태입니다. |

| 14 | 앞의 모든 조건에 해당하지 않을 때입니다. |

| 15 | 그 밖의 수는 normal로 표시합니다. |

| 16 | 순번·값·상태를 출력합니다. 장치를 제어하지 않습니다. |

예상 또는 실제 확인 결과:

```text
1 27.5 normal
2 28.0 alert
3 None missing
4 0.0 normal
5 29.0 invalid
```

한 값 바꾸기: 코드의 28.0을 29.0으로 바꾸면 2번은 normal이 됩니다. 문자열 "29.0"은 계속 invalid입니다.

오류 해결: JSON이 깨지면 큰따옴표와 쉼표를 복구합니다. 값 없음과0을 바꿔 오류를 숨기지 않습니다.

## 03_hysteresis.py

조건: Python 3 표준 라이브러리만 사용합니다. 장치·포트·전원을 연결하지 않습니다.

실행: `python -X utf8 code/03_hysteresis.py`

```python
values = [27.8, 28.1, 27.9, 28.2, 27.4, None, 28.3]
alert = False
for value in values:
    if value is None:
        print("missing", "no command")
        continue
    if value >= 28.0:
        alert = True
    elif value <= 27.5:
        alert = False
    print(value, alert)
```

| 줄 | 코드의 뜻 |

|---:|---|

| 1 | 온도가 흔들리는 가상 순서를 리스트에 저장합니다. |

| 2 | 처음 경고 상태를 꺼짐으로 정합니다. |

| 3 | 값을 시간 순서대로 하나씩 읽습니다. |

| 4 | 미측정 None인지 검사합니다. |

| 5 | 미측정 안내를 출력하며 제어 명령을 만들지 않습니다. |

| 6 | 이번 기록의 나머지를 건너뛰어 이전 상태를 유지합니다. |

| 7 | 28.0 이상이면 켜기 조건입니다. |

| 8 | 경고 상태를 True로 바꿉니다. |

| 9 | 27.5 이하일 때만 끄는 조건입니다. |

| 10 | 경고 상태를 False로 바꿉니다. |

| 11 | 온도와 현재 상태를 출력합니다. 실제 핀 출력은 없습니다. |

예상 또는 실제 확인 결과:

```text
27.8 False
28.1 True
27.9 True
28.2 True
27.4 False
missing no command
28.3 True
```

한 값 바꾸기: 꺼짐 기준27.5를27.9로 바꾸면 세 번째27.9에서False가 됩니다.

오류 해결: 상태 변수를 반복문 안에서 매번 False로 초기화하면 이력 효과가 사라집니다. 들여쓰기와 초기화 위치를 확인합니다.

## 04_serial_mock.ino

조건: ESP32 계열의 정확한 보드와 core, USB/UART Serial 경로가 확인된 후 강사가 선택합니다. GPIO 핀을 쓰지 않습니다.

실행: `보드 확정 뒤 Arduino IDE에서 보드·포트·core 설정 후 빌드/업로드하는 선택 경로. 이번 제작에서는 미실행.`

```cpp
void setup() {
  Serial.begin(115200);
}
void loop() {
  Serial.println("{\"sensor_id\":\"S01\",\"temperature_c\":28.0}");
  delay(1000);
}
```

| 줄 | 코드의 뜻 |

|---:|---|

| 1 | 시작 시 한 번 실행할 setup 함수의 블록을 엽니다. |

| 2 | 직렬 통신을115200 설정으로 초기화합니다. |

| 3 | setup의 블록을 닫습니다. |

| 4 | 계속 반복할 loop 함수의 블록을 엽니다. |

| 5 | 센서 측정 대신 고정 JSON 문장과 줄바꿈을 출력합니다. 역슬래시는 내부 따옴표를 표현합니다. |

| 6 | 다음 반복 전1000ms를 기다립니다. 정밀 수집 주기 보장은 아닙니다. |

| 7 | loop 블록을 닫습니다. |

예상 또는 실제 확인 결과:

```text
조건부 예상: {"sensor_id":"S01","temperature_c":28.0}
같은 문장을 반복 출력. 실물 컴파일·업로드·수신 미실행.
```

한 값 바꾸기: 온도 리터럴28.0을29.0으로 바꾸면 전송 문장의 값만 바뀝니다. 실제 센서를 측정한 것이 아닙니다.

오류 해결: 보드 모델·core·USB 모드·Serial 연결 경로를 확인합니다. 포트가 없으면 연결을 추측하지 말고 Python 모의 입력으로 진행합니다.

## 역슬래시 표시

일부 한국어 글꼴에서는 역슬래시(ASCII 코드 92)가 원화 기호 모양으로 보입니다. `04_serial_mock.ino`의 문자열 안에서 큰따옴표 앞에 놓인 문자는 역슬래시이며, 다음 큰따옴표를 문장 내용으로 취급하게 합니다. 타이핑으로 복원하기보다 제공한 원본 파일의 해당 줄을 확인합니다.
