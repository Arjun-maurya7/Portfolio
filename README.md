# Arjun Maurya - Personal Portfolio

A modern, responsive portfolio website built with Flask, HTML, Tailwind CSS, and vanilla JavaScript. The design is inspired by Matt Farley's portfolio with a clean, minimalist black-and-white aesthetic.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Mode**: Toggle between light and dark themes with persistent storage
- **Smooth Animations**: Scroll-triggered animations and hover effects
- **Typewriter Effect**: Animated hero text with typewriter animation
- **Interactive Navigation**: Smooth scrolling navigation with active link highlighting
- **Contact Form**: Functional contact form with validation
- **Modern UI**: Clean, minimalist design with Tailwind CSS

## Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Heroicons (SVG icons)

## Project Structure

```
Portfolio/
├── app.py                 # Flask application
├── run.py                 # Enhanced Flask runner
├── run.bat                # Windows batch file for easy startup
├── requirements.txt       # Python dependencies
├── README.md             # Project documentation
├── .gitignore            # Git ignore file
├── templates/
│   └── index.html        # Main HTML template
└── static/
    ├── css/
    │   └── style.css     # Custom CSS styles
    └── js/
        └── script.js     # JavaScript functionality
```

## Installation & Setup

1. **Clone the repository** (if applicable) or navigate to the project directory
2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
3. **Run the Flask application**:
   ```bash
   python app.py
   ```
   Or use the enhanced runner:
   ```bash
   python run.py
   ```
   Or on Windows, simply double-click:
   ```bash
   run.bat
   ```
4. **Open your browser** and navigate to `http://localhost:5000`

## Sections

### Hero Section
- Animated introduction with typewriter effect
- Call-to-action buttons
- Responsive design

### About Section
- Personal information and background
- Education details
- Key skills and interests

### Skills Section
- Organized skill categories:
  - Python (Data Science, Web Development, Automation)
  - Programming Languages (C++, Java, JavaScript)
  - Web Development (React.js, Node.js, MongoDB)
  - Data Science & Analytics
  - Tools & Technologies
  - Game Development

### Projects Section
- Real-Time Memory Allocation Tracker
- Grammar Checker Tool
- Data Analysis of IGNOAPS Beneficiaries

### Contact Section
- Contact form with validation
- Social media links
- Contact information

## Customization

### Personal Information
Update the following in `templates/index.html`:
- Name and role
- University and education details
- Skills and technologies
- Project descriptions
- Contact information

### Styling
- All styling is done with Tailwind CSS classes
- Custom animations are defined in the `<style>` section
- Color scheme can be modified by changing Tailwind classes

### JavaScript Functionality
- All interactive features are in `static/js/script.js`
- Theme toggle, animations, and form handling
- Smooth scrolling and navigation

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Performance Features

- Optimized images and assets
- Smooth scroll animations
- Efficient JavaScript with event delegation
- Responsive images and layouts
- Minimal external dependencies

## Development

### Running in Development Mode
```bash
python app.py
```
The application will run in debug mode with auto-reload enabled.

### Production Deployment
For production deployment, consider using:
- Gunicorn (WSGI server)
- Nginx (reverse proxy)
- Environment variables for configuration

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

**Arjun Maurya**
- Email: arjunmaurya2026@gmail.com
- LinkedIn: [linkedin.com/in/maurya-arjun/](https://www.linkedin.com/in/maurya-arjun/)
- GitHub: [github.com/Arjun-maurya7](https://github.com/Arjun-maurya7)
- Location: Bhadohi, Uttar Pradesh, India

---

*Designed & Built by Arjun Maurya © 2025*
