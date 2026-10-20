"""좌표만 계산합니다. 모델이나 카메라가 없어도 시험할 수 있습니다."""


def bottom_center(xyxy):
    # 사람의 발이 있는 쪽을 대표점으로 선택합니다. 박스 전체 겹침과 다릅니다.
    left, top, right, bottom = xyxy
    return ((left + right) / 2, bottom)


def inside(point, zone):
    x, y = point
    left, top, right, bottom = zone
    return left <= x <= right and top <= y <= bottom


def side(point, line_x, margin):
    # 선 주위 여유 영역은 0입니다. 작은 떨림을 통과로 세지 않습니다.
    if point[0] < line_x - margin:
        return -1
    if point[0] > line_x + margin:
        return 1
    return 0
