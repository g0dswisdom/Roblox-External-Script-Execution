import customtkinter
import requests
import os
import threading
os.environ['NO_PROXY'] = '127.0.0.1'

root = customtkinter.CTk()
root.title('Project')
root.geometry('400x300')
label = customtkinter.CTkLabel(master=root, text='External Script Execution', font=('Arial', 15))
label.place(x=110,y=30)
text = customtkinter.CTkTextbox(master=root, height=100, width=170)
text.place(x=110,y=60)
def buttonCb():
    txt = text.get("1.0", "end-1c")
    print('hi')
    threading.Thread(target=sendRequest, args=(txt,), daemon=True).start()
def sendRequest(script):
    try:
        resp = requests.post('http://localhost:3000/scripts', json={'script': script})
        print('done')
    except Exception as err:
        print(err)
button = customtkinter.CTkButton(master=root, text='Execute Script', command=buttonCb)
button.place(x=125,y=180)

root.mainloop()