"""목록·버튼·메시지를 담당하는 화면입니다."""
from pathlib import Path
import tkinter as tk
from tkinter import ttk, messagebox
from inventory import Inventory


def main():
    root = tk.Tk()
    root.title("실습실 장비 대여")
    root.geometry("680x420")
    # __file__은 이 Python 파일 자체의 위치입니다.
    path = Path(__file__).resolve().parent / "data" / "equipment.json"
    try:
        inventory = Inventory(path)
    except (OSError, ValueError) as error:
        messagebox.showerror("자료를 열 수 없습니다", str(error))
        root.destroy()
        return

    ttk.Label(root, text="장비를 선택한 뒤 대여 또는 반납을 누르세요.", padding=16).pack()
    table = ttk.Treeview(root, columns=("name", "total", "available"), show="headings", selectmode="browse")
    for column, title in [("name", "장비"), ("total", "전체"), ("available", "남은 수량")]:
        table.heading(column, text=title)
        table.column(column, width=170, anchor="center")
    table.pack(fill="both", expand=True, padx=16, pady=8)

    def refresh():
        # 화면 목록만 비우고 저장된 장비 목록으로 다시 채웁니다.
        for row in table.get_children():
            table.delete(row)
        for item in inventory.items:
            table.insert("", "end", iid=item["id"], values=(item["name"], item["total"], item["available"]))

    def act(action):
        selected = table.selection()
        if not selected:
            messagebox.showinfo("선택 필요", "먼저 장비를 선택하세요.")
            return
        try:
            action(selected[0])
        except (ValueError, OSError, NotImplementedError) as error:
            messagebox.showinfo("처리 안내", str(error))
        refresh()

    buttons = ttk.Frame(root, padding=12)
    buttons.pack()
    ttk.Button(buttons, text="대여", command=lambda: act(inventory.checkout)).pack(side="left", padx=8)
    ttk.Button(buttons, text="반납", command=lambda: act(inventory.give_back)).pack(side="left", padx=8)
    refresh()
    root.mainloop()


if __name__ == "__main__":
    main()
