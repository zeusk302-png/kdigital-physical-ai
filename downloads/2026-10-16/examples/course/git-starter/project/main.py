"""실행: 이 파일이 있는 폴더에서 python main.py. 추가 패키지가 없습니다."""
import tkinter as tk
from tkinter import messagebox
from tracker import add_task, remove_task

# tasks는 현재 할 일을 순서대로 담는 리스트입니다. 종료하면 초기화됩니다.
tasks = []
root = tk.Tk()
root.title("나의 할 일")
root.geometry("500x390")

tk.Label(root, text="오늘 할 일", font=("Malgun Gothic", 20)).pack(pady=14)
entry = tk.Entry(root, font=("Malgun Gothic", 12))
entry.pack(fill="x", padx=24)
listbox = tk.Listbox(root, height=8, font=("Malgun Gothic", 12))
listbox.pack(fill="both", expand=True, padx=24, pady=12)
status = tk.Label(root, text="남은 일 0개")
status.pack()

def refresh():
    # 화면의 목록을 지우고 현재 데이터로 다시 채웁니다.
    listbox.delete(0, tk.END)
    for task in tasks:
        listbox.insert(tk.END, task)
    status.config(text=f"남은 일 {len(tasks)}개")

def on_add():
    try:
        add_task(tasks, entry.get())
    except ValueError as error:
        messagebox.showinfo("입력 확인", str(error))
        return
    entry.delete(0, tk.END)
    refresh()

def on_complete():
    selected = listbox.curselection()
    if not selected:
        messagebox.showinfo("선택 확인", "완료할 항목을 먼저 선택하세요.")
        return
    remove_task(tasks, selected[0])
    refresh()

# command에는 함수 이름만 넣습니다. ()를 붙이면 화면을 만들 때 실행됩니다.
tk.Button(root, text="추가", command=on_add).pack(side="left", padx=24, pady=14)
tk.Button(root, text="선택한 일 완료", command=on_complete).pack(side="right", padx=24, pady=14)
root.mainloop()  # 창을 유지하고 클릭과 입력을 기다립니다.
