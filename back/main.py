from fastapi import FastAPI, Request
from starlette.middleware.cors import CORSMiddleware



app = FastAPI(
    title="My API"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def index():
    return {"Status": "OK"}


@app.post("/move_card/")
async def move_card(req: Request):
    json = await req.json()
    print(json)
    return {"Status": "OK"}



if __name__ == '__main__':
    print("Run me using uvicorn")


