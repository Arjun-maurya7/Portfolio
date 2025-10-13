from flask import Flask, render_template

app = Flask(__name__)

# Certificates data
certificates_data = [
    {
        "title": "The Bits and Bytes of Computer Networking",
        "provider": "Google via Coursera",
        "year": "2024",
        "description": "Completed a course authorized by Google and offered through Coursera, covering networking technologies, cloud, and practical applications.",
        "certificate_url": "https://www.coursera.org/account/accomplishments/certificate/XXXXXXXXXX",
        "skills": ["Computer Networking", "Cloud Technologies", "Network Protocols"],
        "duration": "40+ hours"
    },
    {
        "title": "Digital Systems: From Logic Gates to Processors",
        "provider": "Universitat Autònoma de Barcelona via Coursera",
        "year": "2024",
        "description": "Completed a course authorized by Universitat Autònoma de Barcelona on Coursera, requiring 40 hours of dedication.",
        "certificate_url": "https://www.coursera.org/account/accomplishments/certificate/XXXXXXXXXX",
        "skills": ["Digital Electronics", "Logic Gates", "Computer Architecture", "Processors"],
        "duration": "40 hours"
    },
    {
        "title": "Front-End Web Development Training",
        "provider": "Gokboru Tech Pvt. Ltd.",
        "year": "2025",
        "description": "Completed a 6-week training by Gokboru Tech Pvt. Ltd., covering HTML, CSS, JavaScript, responsive design, and modern frameworks.",
        "certificate_url": "https://example.com/certificate/frontend-development",
        "skills": ["HTML", "CSS", "JavaScript", "Responsive Design", "Modern Frameworks"],
        "duration": "6 weeks"
    },
    {
        "title": "ChatGPT Made Easy: AI Essentials for Beginners",
        "provider": "Udemy",
        "year": "2025",
        "description": "Completed a Udemy certificate course on AI Essentials for Beginners, focusing on ChatGPT and prompt engineering.",
        "certificate_url": "https://www.udemy.com/certificate/UC-XXXXXXXXXX/",
        "skills": ["AI Essentials", "ChatGPT", "Prompt Engineering", "Natural Language Processing"],
        "duration": "Self-paced"
    },
    {
        "title": "Master Generative AI & Generative AI Tools (ChatGPT & More)",
        "provider": "Udemy",
        "year": "2025",
        "description": "Completed a Udemy course mastering Generative AI and tools like ChatGPT, DALL·E, and Midjourney.",
        "certificate_url": "https://www.udemy.com/certificate/UC-XXXXXXXXXX/",
        "skills": ["Generative AI", "ChatGPT", "DALL·E", "Midjourney", "AI Tools"],
        "duration": "Self-paced"
    },
    {
        "title": "Build Generative AI Apps and Solutions with No-Code Tools",
        "provider": "Udemy",
        "year": "2025",
        "description": "Completed a Udemy course on building AI applications using No-Code tools.",
        "certificate_url": "https://www.udemy.com/certificate/UC-XXXXXXXXXX/",
        "skills": ["Generative AI", "No-Code Tools", "AI Applications", "Automation"],
        "duration": "Self-paced"
    }
]

# Detailed timeline data
timeline_data = [
    {
        "year": "2004",
        "title": "Born",
        "description": "The beginning of my journey.",
        "context": [
            "Born in Bhadohi, Uttar Pradesh, India"
        ],
        "impact": "Foundation of life."
    },
    {
        "year": "2019",
        "title": "Secondary Education Completion",
        "description": "Successfully completed my Secondary School Examination (Class 10).",
        "context": [
            "Central Board of Secondary Education (CBSE)",
            "Subjects: English, Hindi, Mathematics, Science, Social Science, Foundation of IT"
        ],
        "impact": "Built a strong academic foundation in core subjects."
    },
    {
        "year": "2021",
        "title": "Senior Secondary Education Completion",
        "description": "Successfully completed my Senior School Certificate Examination (Class 12).",
        "context": [
            "Central Board of Secondary Education (CBSE)",
            "Subjects: English Core, Mathematics, Physics, Chemistry, Physical Education, Work Experience, Health & Physical Education, General Studies"
        ],
        "impact": "Completed advanced academic education, preparing for higher studies in technology."
    },
    {
        "year": "2021",
        "title": "Environmental Awareness & Tree Planting",
        "description": "Participated in an 'Environmental Awareness & Tree Planting' project under the supervision of Rajesh Singh Kushwaha, dedicating 35 hours to the project.",
        "context": [
            "Green Peace Nature Foundation",
            "Community service and environmental conservation"
        ],
        "impact": "Developed social responsibility and environmental awareness."
    },
    {
        "year": "2022",
        "title": "B.Tech in Computer Science and Engineering",
        "description": "Started pursuing B.Tech in Computer Science and Engineering (CSE) with a minor in Data Science at Lovely Professional University.",
        "context": [
            "Lovely Professional University (LPU)",
            "Registration No: 12318080"
        ],
        "impact": "Began professional journey toward becoming a computer engineer."
    },
    {
        "year": "2023",
        "title": "Python and Programming Foundations",
        "description": "Started learning Python programming language, building on existing knowledge of C and C++.",
        "context": [
            "Languages: C, C++, Python (Basic)",
            "Focus on programming logic and data structures"
        ],
        "impact": "Strengthened problem-solving and coding fundamentals."
    },
    {
        "year": "2024",
        "title": "The Bits and Bytes of Computer Networking",
        "description": "Completed a course authorized by Google and offered through Coursera, covering networking technologies, cloud, and practical applications.",
        "context": [
            "Google, Coursera",
            "Computer Networking"
        ],
        "impact": "Gained a solid understanding of computer networking fundamentals."
    },
    {
        "year": "2024",
        "title": "Digital Systems: From Logic Gates to Processors",
        "description": "Completed a course authorized by Universitat Autònoma de Barcelona on Coursera, requiring 40 hours of dedication.",
        "context": [
            "Universitat Autònoma de Barcelona, Coursera",
            "Digital Systems, Logic Gates, Processors"
        ],
        "impact": "Acquired knowledge of digital electronics and computer architecture."
    },
    {
        "year": "2024",
        "title": "Real-Time Memory Allocation Tracker Project",
        "description": "Developed a real-time visualization project demonstrating memory allocation, paging, and segmentation for the Operating System course (CSE306).",
        "context": [
            "Operating Systems Project",
            "Languages and Tools: C/C++, Data Visualization"
        ],
        "impact": "Enhanced understanding of memory management in operating systems."
    },
    {
        "year": "2024",
        "title": "Data Analysis of IGNOAPS Beneficiaries",
        "description": "Completed a Data Science minor project focused on analyzing beneficiaries under the Indira Gandhi National Old Age Pension Scheme (IGNOAPS).",
        "context": [
            "INT375: Data Science Minor Project",
            "Exploratory Data Analysis, Visualization, Statistical Summary"
        ],
        "impact": "Applied data analysis and visualization techniques to real-world social data."
    },
    {
        "year": "2024",
        "title": "Code-A-Haunt Hackathon Participation",
        "description": "Participated in the 'Code-A-Haunt' 24-hour hackathon organized by CodingBlocks LPU.",
        "context": [
            "CodingBlocks LPU, Lovely Professional University",
            "24-hour hackathon focused on coding and innovation"
        ],
        "impact": "Demonstrated teamwork, creativity, and problem-solving under pressure."
    },
    {
        "year": "2025",
        "title": "Front-End Web Development Training",
        "description": "Completed a 6-week training by Gokboru Tech Pvt. Ltd., covering HTML, CSS, JavaScript, responsive design, and modern frameworks.",
        "context": [
            "Gokboru Tech Pvt. Ltd., Startup India, Startup Punjab",
            "Front-End Web Development, Modern Frameworks"
        ],
        "impact": "Gained hands-on experience in building responsive web applications."
    },
    {
        "year": "2025",
        "title": "MERN Stack Development Learning",
        "description": "Started learning the MERN stack (MongoDB, Express.js, React.js, Node.js) from basics to build full-stack web applications.",
        "context": [
            "Self-learning, Online resources",
            "Web development and backend integration"
        ],
        "impact": "Strengthened understanding of full-stack web application development."
    },
    {
        "year": "2025",
        "title": "ChatGPT Made Easy: AI Essentials for Beginners",
        "description": "Completed a Udemy certificate course on AI Essentials for Beginners, focusing on ChatGPT and prompt engineering.",
        "context": [
            "Udemy, Asif Farooqi, Abdullah Dar",
            "AI Essentials, ChatGPT"
        ],
        "impact": "Developed foundational knowledge of AI and natural language models."
    },
    {
        "year": "2025",
        "title": "Master Generative AI & Generative AI Tools (ChatGPT & More)",
        "description": "Completed a Udemy course mastering Generative AI and tools like ChatGPT, DALL·E, and Midjourney.",
        "context": [
            "Udemy, Saad A",
            "Generative AI, AI Tools"
        ],
        "impact": "Built strong expertise in Generative AI concepts and applications."
    },
    {
        "year": "2025",
        "title": "Build Generative AI Apps and Solutions with No-Code Tools",
        "description": "Completed a Udemy course on building AI applications using No-Code tools.",
        "context": [
            "Udemy, Henry Habib, The Intelligent Worker",
            "Generative AI, No-Code Tools"
        ],
        "impact": "Learned to create AI-powered applications without coding."
    },
    {
        "year": "Future",
        "title": "Vision Ahead",
        "description": "Focused on creating innovative tech solutions, strengthening skills in AI and web development, and contributing to the tech community.",
        "context": [
            "Career growth",
            "Innovation in technology",
            "Continuous learning and exploration"
        ],
        "impact": "Aiming to make meaningful contributions in technology and data-driven innovation."
    }
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/about')
def about():
    return render_template('about.html', timeline_data=timeline_data)

@app.route('/certificates')
def certificates():
    return render_template('certificates.html', certificates_data=certificates_data)

if __name__ == '__main__':
    app.run(debug=True)
