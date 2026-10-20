# 설계

app.py는 목록·버튼·메시지, inventory.py는 입력검사·수량·저장 담당.
장비는 id로 구분한다. name/total/available 필드 유지.
항상 0 <= available <= total. 저장 실패 시 메모리 수량도 복구한다.
검색 목록과 저장 원본은 구분한다.
