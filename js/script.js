// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animations
const observerOptions = {
    threshold: 0.1
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// Smooth Scroll for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Form Feedback
const contactForm = document.getElementById('portfolio-contact');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        btn.innerText = 'Sent Successfully!';
        btn.style.background = '#10b981'; // Green feedback
        contactForm.reset();

        setTimeout(() => {
            btn.innerText = 'Send Message';
            btn.style.background = '';
        }, 3000);
    });
}

// Project Modal Logic
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-modal');

const projectData = {
    ocean: {
        title: "Employee Management System",
        images: [
            "assets/img/ems-dashboard.png",
            "assets/img/ems-employees.png",
            "assets/img/ems-daily-attendance.png"
        ],
        desc: "A simple application made when I was in 3rd year college for semester project. It was developed using C# and SQL Server. It is a desktop application that is used to manage employee information and monitor their attendance."
    },
    nebula: {
        title: "Nebula E-com",
        images: [
            "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        desc: "A high-performance e-commerce solution focused on futuristic aesthetics and seamless user journeys. Built with advanced animations and a streamlined checkout process to maximize conversion rates."
    },
    techsphere: {
        title: "Regional Project Tracking System",
        images: ["assets/img/rpts-landing.png", "assets/img/rpts-charts.png", "assets/img/rpts-projects.png"],
        desc: [
            "The Regional Project Tracking System (RPTS) is a system database containing the priority programs, activities, and projects (PAPs) of regional line agencies, government owned and controlled corporations, and state universities and colleges in the Bicol region that are included in the Regional Development Investment Program (RDIP) 2023-2028.",
            "It is being developed to facilitate the tracking and updating of PAPs and can generate reports as well as investment programming-related documents such as the RDIP, status of RDC-endorsed projects, and list of projects per province/district/city/municipality, among others."
        ]
    }
};

document.querySelectorAll('.learn-more-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const projectCard = e.target.closest('.project-card');
        const projectId = projectCard.getAttribute('data-project');
        const data = projectData[projectId];

        if (data) {
            const imagesHtml = data.images.map(img => `<img src="${img}" alt="${data.title}">`).join('');
            const dotsHtml = data.images.map((_, i) => `<div class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`).join('');

            const descHtml = (Array.isArray(data.desc) ? data.desc : [data.desc])
                .map(para => `<p style="margin-bottom: 1rem;">${para}</p>`)
                .join('');

            modalBody.innerHTML = `
                <div class="modal-body-content">
                    <h2 style="margin-bottom: 1rem;">${data.title}</h2>
                    <div style="margin-bottom: 2rem;">${descHtml}</div>
                    
                    <div class="modal-slider">
                        <div class="slider-track">
                            ${imagesHtml}
                        </div>
                    </div>
                    <div class="slider-dots">
                        ${dotsHtml}
                    </div>
                </div>
            `;

            // Slider Logic
            const slider = modalBody.querySelector('.modal-slider');
            const dots = modalBody.querySelectorAll('.dot');

            const updateDots = (index) => {
                dots.forEach(d => d.classList.remove('active'));
                if (dots[index]) dots[index].classList.add('active');
            };

            // Dot clicks to scroll
            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    const index = parseInt(dot.getAttribute('data-index'));
                    slider.scrollTo({
                        left: index * slider.offsetWidth,
                        behavior: 'smooth'
                    });
                });
            });

            // Sync dots on scroll
            slider.addEventListener('scroll', () => {
                const index = Math.round(slider.scrollLeft / slider.offsetWidth);
                updateDots(index);
            });

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
