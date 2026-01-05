import requests
import json
from datetime import datetime

USERNAME = "aminul01-g"
URL = f"https://api.github.com/users/{USERNAME}/repos?per_page=100&sort=pushed"

# Manual enhancements for specific projects (images, specific tech, better descriptions)
ENHANCEMENTS = {
    "groq-langgraph-rag": {
        "title": "RAG Chatbot",
        "featured": True,
        "thumbnail": "🤖",
        "description": "A sophisticated Retrieval-Augmented Generation (RAG) chatbot built with LangGraph, Groq, and Pinecone. Features an intelligent router that proactively switches between document retrieval and Tavily web search, providing comprehensive answers via a modern Streamlit interface. Includes execution tracing and is Docker-ready for easy deployment.",
        "technologies": ["Python", "LangGraph", "Pinecone", "Groq", "Streamlit", "Docker"],
        "tags": ["AI", "LLM", "RAG", "Agentic Workflow"],
        "role": "AI Engineer",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" # Placeholder
    },
    "krishi-bondhu": {
        "title": "Krishi Bondhu",
        "featured": True,
        "thumbnail": "🌾",
        "description": "A comprehensive agricultural platform empowering farmers with AI-driven crop disease detection, real-time market price analysis, and expert consultation channels. Built with a responsive React frontend and a robust Node.js backend to bridge the gap between technology and agriculture.",
        "tags": ["Web App", "Agriculture", "React", "AI"],
        "technologies": ["React", "Node.js", "Express", "TailwindCSS", "MongoDB", "Framer Motion"],
        "role": "Full Stack Developer",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    "University-Management-System": {
        "title": "University Management System",
        "thumbnail": "🎓",
        "description": "A robust desktop application for managing university operations, including student enrollment, course scheduling, and grade management. Designed with a focus on data integrity, clean architecture, and efficient SQL queries.",
        "tags": ["Software Engineering", "Java", "SQL"],
        "technologies": ["Java", "Swing", "MySQL", "JDBC"],
        "role": "Backend Developer",
        "featured": True,
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    "aiStudyAssistant": {
        "title": "AI Study Assistant",
        "thumbnail": "📚",
        "description": "An intelligent study companion that leverages machine learning to create personalized study plans and track student progress. Features real-time analytics and adaptive learning paths.",
        "tags": ["AI", "Education", "React"],
        "technologies": ["React", "TypeScript", "Node.js", "MongoDB", "TensorFlow.js"],
        "role": "Full Stack Developer",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    "LearnML": {
        "title": "Learn Machine Learning",
        "thumbnail": "🧠",
        "description": "A comprehensive educational repository featuring interactive Jupyter notebooks and hands-on tutorials. Covers the entire ML spectrum from foundational regression models to advanced deep learning architectures.",
        "tags": ["Machine Learning", "Education", "Python"],
        "technologies": ["Python", "Jupyter", "scikit-learn", "TensorFlow", "PyTorch"],
        "role": "Content Creator",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    },
    "Predictive-Modeling-of-Ames-Housing-Data": {
        "title": "Ames Housing Prediction",
        "thumbnail": "🏠",
        "description": "An end-to-end data science project performing rigorous exploratory data analysis (EDA) and predictive modeling. Utilizes advanced regression techniques to accurately predict housing prices.",
        "tags": ["Data Science", "Regression", "Python"],
        "technologies": ["Python", "pandas", "numpy", "scikit-learn", "Matplotlib"],
        "role": "Data Scientist",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
    },
    "Diabetes-Detection-System": {
        "title": "Diabetes Detection AI",
        "thumbnail": "🏥",
        "description": "A medical diagnostic tool using binary classification algorithms to predict diabetes risk. Achieved high accuracy on the Pima Indians Diabetes Dataset and deployed as a REST API.",
        "tags": ["Healthcare", "ML", "Python"],
        "technologies": ["Python", "scikit-learn", "Flask", "Docker"],
        "role": "ML Engineer",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
    },
    "multi-tool-medical-ai": {
        "title": "Multi-Tool Medical AI",
        "thumbnail": "🩺",
        "description": "An advanced AI agent orchestrating multiple tools to query specialized medical datasets (Heart Disease, Cancer, Diabetes) and retrieve general medical knowledge via web search.",
        "tags": ["AI", "Agents", "LangChain"],
        "technologies": ["Python", "LangChain", "OpenAI", "Pandas"],
        "role": "AI Engineer",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
    },
    "Personality_Detection-Extrovert_vs_Introvert": {
        "title": "Personality Detection",
        "thumbnail": "🎭",
        "description": "NLP-based classification model that analyzes text patterns to predict personality traits (Extroversion vs. Introversion), useful for psychometric analysis.",
        "tags": ["ML", "NLP", "Classification"],
        "role": "ML Researcher",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
    },
    "titanic-survival-app": {
        "title": "Titanic Survival Predictor",
        "thumbnail": "🚢",
        "description": "Interactive web app predicting Titanic passenger survival probabilities. Demonstrates data preprocessing, feature engineering, and model deployment.",
        "tags": ["ML", "Classification", "Python"],
        "technologies": ["Python", "Streamlit", "scikit-learn"],
        "role": "ML Engineer"
    },
    "Stress-Level-Detection-System": {
        "title": "Stress Level Detection",
        "thumbnail": "🧘",
        "description": "Machine learning system analyzing physiological and behavioral data to detect stress levels, promoting mental health awareness.",
        "tags": ["ML", "Healthcare", "Analytics"],
        "role": "Data Scientist",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4"
    },
    "LinkedinPostGenerator": {
        "title": "LinkedIn Post Generator",
        "thumbnail": "✍️",
        "description": "GenAI tool that crafts professional LinkedIn posts from rough ideas. Fine-tuned for engagement and professional tone.",
        "tags": ["AI", "NLP", "GenAI"],
        "role": "Developer",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
    },
    "qa-transformers-finetune": {
        "title": "QA Transformers Finetune",
        "thumbnail": "🔧",
        "description": "Fine-tuned transformer models for question-answering tasks.",
        "tags": ["NLP", "Transformers", "QA"],
        "role": "ML Engineer",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
    },
    "IMDB-Sentiment-Analysis": {
        "title": "IMDB Sentiment Analysis",
        "thumbnail": "🎬",
        "description": "Sentiment analysis on IMDB movie reviews using deep learning.",
        "tags": ["NLP", "Sentiment", "Deep Learning"],
        "role": "ML Engineer",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    "Next_Word_Prediction-LSTM": {
        "title": "Next Word Prediction",
        "thumbnail": "📝",
        "description": "LSTM-based next word prediction model.",
        "tags": ["NLP", "LSTM", "Prediction"],
        "role": "ML Engineer",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    "people-flow-tracker-yolov8": {
        "title": "People Flow Tracker",
        "thumbnail": "👥",
        "description": "Real-time people tracking using YOLOv8 for flow analysis.",
        "tags": ["Computer Vision", "YOLO", "Tracking"],
        "role": "CV Engineer",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    "Question_Answer_prediction-RNN": {
        "title": "QA Prediction RNN",
        "thumbnail": "❓",
        "description": "RNN-based question answering system.",
        "tags": ["NLP", "RNN", "QA"],
        "role": "ML Engineer",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    "Digit_Classification-acc-98.43": {
        "title": "Digit Classifier",
        "thumbnail": "🔢",
        "description": "High-accuracy digit classification on MNIST.",
        "tags": ["Computer Vision", "Classification", "Neural Networks"],
        "role": "ML Engineer",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    },
    "clothing-classifier": {
        "title": "Clothing Classifier",
        "thumbnail": "👕",
        "description": "Fashion item classification using CNNs.",
        "tags": ["Computer Vision", "Fashion", "CNN"],
        "role": "ML Engineer",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
    },
    "Clustering-Iris-Dataset": {
        "title": "Iris Clustering",
        "thumbnail": "🌸",
        "description": "Unsupervised clustering on the classic Iris dataset.",
        "tags": ["Machine Learning", "Clustering", "Data Science"],
        "role": "Data Scientist",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
    },
    "ai_study_assistent_with-API-": {
        "title": "AI Study Assistant API",
        "thumbnail": "📖",
        "description": "Study assistant with REST API integration.",
        "tags": ["AI", "Education", "API"],
        "role": "Full Stack Developer",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
    }
}

def fetch_repos():
    try:
        response = requests.get(URL)
        response.raise_for_status()
        repos = response.json()
        return repos
    except Exception as e:
        print(f"Error fetching repos: {e}")
        return []

def generate_ts(repos):
    projects = []
    
    excluded_repos = {
        "aminul01-g", 
        "aminul01-g.github.io", 
        "Learn-Java",
        "Learn_Java",
        "linux-tools"
    }

    for repo in repos:
        name = repo['name']
        if name in excluded_repos:
            continue
            
        enhancement = ENHANCEMENTS.get(name, {})
        
        # Base data from GitHub
        description = repo['description'] or "No description provided."
        topics = repo.get('topics', [])
        language = repo.get('language')
        
        # Merge with enhancements
        title = enhancement.get('title', name.replace('-', ' ').replace('_', ' ').title())
        thumbnail = enhancement.get('thumbnail', '💻')
        featured = enhancement.get('featured', False)
        role = enhancement.get('role', 'Developer')
        videoUrl = enhancement.get('videoUrl', None)
        
        # Construct tags/tech
        tags = enhancement.get('tags', topics if topics else ([language] if language else []))
        # Ensure tags are capitalized
        tags = [t.title() for t in tags]
        
        technologies = enhancement.get('technologies', [])
        if not technologies and language:
            technologies.append(language)
            
        project_data = {
            "title": title,
            "description": description,
            "tags": tags,
            "technologies": technologies,
            "github": repo['html_url'],
            "slug": name.lower(),
            "thumbnail": thumbnail,
            "demoUrl": repo['homepage'] if repo['homepage'] else repo['html_url'],
            "featured": featured,
            "date": repo['created_at'].split('T')[0],
            "role": role,
        }
        
        # Only include videoUrl if it exists
        if videoUrl:
            project_data["videoUrl"] = videoUrl
            
        projects.append(project_data)

    # Sort: Featured first, then by date desc
    projects.sort(key=lambda x: (not x['featured'], x['date']), reverse=False) # False for not featured means featured (True=1) comes last? No.
    # Python sort is stable. 
    # Tuple (is_not_featured, NEGATIVE_date) to sort featured first, then new
    
    projects.sort(key=lambda x: (not x['featured'], x['date']), reverse=True)
    # Wait, True (1) > False (0). So 'not featured' (True) > 'featured' (False).
    # If I sort (not featured), False comes first. So Featured comes first.
    # Second key: date. I want recent first. '2025' > '2024'.
    # So (False, '2025') vs (True, '2025'). False < True.
    # So ASCENDING sort puts Featured first.
    # And for date: '2025' > '2024'. So I need DESCENDING for date.
    # Mixed sort is annoying. Let's just do two sorts.
    
    projects.sort(key=lambda x: x['date'], reverse=True) # Sort by date desc
    projects.sort(key=lambda x: x['featured'], reverse=True) # Sort by featured desc (True first)

    ts_content = "import type { Project } from './projects.d';\n\nexport const projects: Project[] = "
    ts_content += json.dumps(projects, indent=2) + ";\n"
    
    return ts_content

if __name__ == "__main__":
    repos = fetch_repos()
    if repos:
        content = generate_ts(repos)
        with open("src/data/projects.ts", "w") as f:
            f.write(content)
        print(f"Successfully wrote {len(repos)} projects to src/data/projects.ts")
    else:
        print("No repos found.")
