from flask import Flask, render_template, send_from_directory, request, jsonify
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)

# ── Certificates data ──────────────────────────────────────────────
certificates_data = [
    {
        "title": "The Complete Python Pro Bootcamp",
        "provider": "Udemy — Angela Yu",
        "year": "2025",
        "description": "Comprehensive Python course covering fundamentals through advanced topics including OOP, file I/O, web scraping, APIs, data science with Pandas & NumPy, and automation.",
        "certificate_url": "https://www.udemy.com/certificate/UC-061bdbc0-891d-4bed-8a8b-b24637f011b5/",
        "skills": ["Python", "OOP", "Data Science", "Automation", "APIs"],
        "duration": "100+ hours"
    },
    {
        "title": "Social Networks",
        "provider": "NPTEL — IIT",
        "year": "2025",
        "description": "Study of social network theory, graph structures, community detection, information diffusion, and the impact of social platforms on human behaviour and society.",
        "certificate_url": "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL25CS65S24750077804443825",
        "skills": ["Social Network Analysis", "Graph Theory", "Community Detection", "Data Analysis"],
        "duration": "8 weeks"
    },
    {
        "title": "Data Structures and Algorithms",
        "provider": "Iamneo",
        "year": "2024",
        "description": "In-depth 72-hour program covering fundamental and advanced data structures (arrays, trees, graphs, heaps) and algorithmic paradigms (sorting, searching, DP, greedy).",
        "certificate_url": "https://drive.google.com/file/d/1ggKNi5D2wv3ZGe8SUEa3EEazmmwUvyEc/view",
        "skills": ["Data Structures", "Algorithms", "Problem Solving", "Python", "C++"],
        "duration": "72 hours"
    },
    {
        "title": "The Bits & Bytes of Computer Networking",
        "provider": "Coursera — Google",
        "year": "2024",
        "description": "Google-authorized networking course covering TCP/IP model, DNS, DHCP, network troubleshooting, cloud networking, and practical network administration skills.",
        "certificate_url": "https://www.coursera.org/account/accomplishments/verify/31MJ9ZY6T93V",
        "skills": ["Computer Networking", "TCP/IP", "DNS", "Network Troubleshooting", "Cloud"],
        "duration": "20+ hours"
    },
    {
        "title": "Introduction to Hardware and Operating Systems",
        "provider": "Coursera — IBM",
        "year": "2024",
        "description": "IBM-backed course exploring computer hardware components, operating system fundamentals, virtualization, file systems, and system administration basics.",
        "certificate_url": "https://www.coursera.org/account/accomplishments/verify/LDG7IIM4HCZP",
        "skills": ["Hardware", "Operating Systems", "Virtualization", "Linux", "System Admin"],
        "duration": "15+ hours"
    },
    {
        "title": "Front-End with React.js — Summer Training",
        "provider": "Gokboru Tech Pvt. Ltd.",
        "year": "2025",
        "description": "Industry training covering HTML, CSS, JavaScript, responsive design, React.js hooks, state management (Context API / Redux), React Router, and asynchronous programming with API integration.",
        "certificate_url": "https://drive.google.com/file/d/1qMjE3gyV81-qlQ-jPEgIKl8omta5lS6S/view",
        "skills": ["React.js", "JavaScript", "HTML/CSS", "Redux", "REST APIs"],
        "duration": "6 weeks"
    },
    {
        "title": "ChatGPT Made Easy: AI Essentials for Beginners",
        "provider": "Udemy",
        "year": "2025",
        "description": "Completed a Udemy certificate course on AI Essentials for Beginners, focusing on ChatGPT and prompt engineering techniques for productivity and real-world AI applications.",
        "certificate_url": "https://www.udemy.com/certificate/UC-XXXXXXXXXX/",
        "skills": ["AI Essentials", "ChatGPT", "Prompt Engineering", "NLP"],
        "duration": "Self-paced"
    },
    {
        "title": "Master Generative AI & Generative AI Tools (ChatGPT & More)",
        "provider": "Udemy",
        "year": "2025",
        "description": "Completed a Udemy course mastering Generative AI concepts and tools including ChatGPT, DALL·E, and Midjourney for content creation and automation.",
        "certificate_url": "https://www.udemy.com/certificate/UC-XXXXXXXXXX/",
        "skills": ["Generative AI", "ChatGPT", "DALL·E", "Midjourney", "AI Tools"],
        "duration": "Self-paced"
    },
    {
        "title": "Build Generative AI Apps and Solutions with No-Code Tools",
        "provider": "Udemy",
        "year": "2025",
        "description": "Completed a Udemy course on building AI-powered applications and workflows using No-Code tools — no programming required.",
        "certificate_url": "https://www.udemy.com/certificate/UC-XXXXXXXXXX/",
        "skills": ["Generative AI", "No-Code Tools", "AI Applications", "Automation"],
        "duration": "Self-paced"
    },
]


# ── Routes ─────────────────────────────────────────────────────────
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/certificates')
def certificates():
    return render_template('certificates.html', certificates_data=certificates_data)

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.get_json()
    if not data:
        return jsonify({"status": "error", "message": "No data provided"}), 400
        
    name = data.get('name', 'Unknown')
    email = data.get('email', 'No email')
    message = data.get('message', '')

    message_body = f"Name: {name}\nEmail: {email}\nMessage:\n{message}"

    my_email = "arjunpytest@gmail.com"
    password = "sjzahrdgzstrmlnj"
    
    msg = MIMEText(message_body, "plain", "utf-8")
    msg["Subject"] = f"New Portfolio Contact from {name}"
    msg["From"] = my_email
    msg["To"] = "arjunmaurya9026@gmail.com"

    try:
        connection = smtplib.SMTP("smtp.gmail.com", port=587)
        connection.starttls()
        connection.login(user=my_email, password=password)
        connection.sendmail(my_email, "arjunmaurya9026@gmail.com", msg.as_string())
        connection.close()
        return jsonify({"status": "success"})
    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
