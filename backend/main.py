import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq

# Load API key from backend/.env
load_dotenv()

app = FastAPI(title="AI-Hub API")

# Allow frontend to connect to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Welcome to AI-Hub Backend!",
        "status": "running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.get("/api/test")
def test_connection():
    return {
        "message": "Frontend and backend connection is ready!",
        "status": "success"
    }


# Request format from frontend
class GenerateRequest(BaseModel):
    tool_name: str
    category: str
    prompt: str


# Category-based AI instructions
TOOL_CATEGORIES = {
    "Writing & Creative": (
        "You are an expert writing and creativity assistant. "
        "Help users write, edit, rewrite, brainstorm and create "
        "high-quality content."
    ),

    "Marketing & Business": (
        "You are an expert marketing and business assistant. "
        "Create practical strategies, marketing content, business "
        "plans and professional solutions."
    ),

    "Image & Design": (
        "You are a creative design assistant. "
        "Help users with image ideas, design concepts, prompts, "
        "visual styles and creative direction."
    ),

    "Video & Audio": (
        "You are an expert video and audio assistant. "
        "Help users create scripts, video ideas, narration, "
        "audio concepts and multimedia content."
    ),

    "Productivity": (
        "You are a productivity assistant. "
        "Help users organize tasks, plan schedules, improve efficiency "
        "and complete work effectively."
    ),

    "Education & Learning": (
        "You are a patient educational tutor. "
        "Explain concepts clearly and step by step using simple "
        "language, examples and learning-focused explanations."
    ),

    "Finance & E-commerce": (
        "You are a finance and e-commerce assistant. "
        "Help with budgeting, financial calculations, product "
        "descriptions, online stores and business analysis. "
        "Avoid presenting uncertain financial advice as fact."
    ),

    "Lifestyle": (
        "You are a helpful lifestyle assistant. "
        "Provide practical suggestions for everyday life, "
        "personal organization, travel and general wellbeing."
    ),
}


# AI generation endpoint
@app.post("/api/generate")
def generate_ai_response(request: GenerateRequest):

    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="Groq API key is missing. Check your backend/.env file."
        )

    try:
        client = Groq(api_key=api_key)

        # Use the category received directly from frontend
        category_instruction = TOOL_CATEGORIES.get(
            request.category,
            "You are a helpful AI assistant. Provide clear and useful answers."
        )

        system_instruction = (
            "You are an AI assistant inside AI-Hub. "
            f"The selected tool is '{request.tool_name}'. "
            f"The tool category is '{request.category}'. "
            f"{category_instruction} "
            "Always focus on the user's actual request. "
            "Format your answer clearly and make it easy to understand."
        )

        response = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[
                {
                    "role": "system",
                    "content": system_instruction
                },
                {
                    "role": "user",
                    "content": request.prompt
                }
            ],
            temperature=0.7,
            max_tokens=2048
        )

        result = response.choices[0].message.content

        return {
            "tool": request.tool_name,
            "category": request.category,
            "response": result,
            "status": "success"
        }

    except Exception as e:
        print("AI generation error:", repr(e))

        raise HTTPException(
            status_code=500,
            detail=f"AI generation failed: {str(e)}"
        )