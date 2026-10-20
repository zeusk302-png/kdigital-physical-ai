"""OpenCV의 BGR 색 순서로 구역과 선, 상태를 표시합니다."""
def annotate(result, config, events, frame_index):
    import cv2
    image = result.plot()
    h, w = image.shape[:2]
    left, top, right, bottom = config['zone']
    cv2.rectangle(image, (int(left*w), int(top*h)),
                  (int(right*w), int(bottom*h)), (0, 180, 255), 2)
    x = int(config['line_x'] * w)
    cv2.line(image, (x, 0), (x, h-1), (255, 150, 0), 2)
    label = ','.join(e['type'] for e in events) or 'tracking'
    cv2.putText(image, f'frame {frame_index}: {label}', (15, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 0.65, (0, 255, 0), 2)
    return image
