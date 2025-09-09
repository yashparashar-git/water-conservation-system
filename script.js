document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');

    if (mobileMenuButton && mobileMenuOverlay && closeMobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('hidden');
            mobileMenuOverlay.classList.add('flex');
        });

        closeMobileMenuButton.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('flex');
            mobileMenuOverlay.classList.add('hidden');
        });

        // Close menu when a link is clicked
        mobileMenuOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuOverlay.classList.remove('flex');
                mobileMenuOverlay.classList.add('hidden');
            });
        });
    }

    // Tracker Page Logic (only runs if on tracker.html)
    if (window.location.pathname.includes('tracker.html')) {
        const waterFill = document.getElementById('waterFill');
        const tankLabel = document.getElementById('tankLabel');
        const todayUsageDisplay = document.getElementById('todayUsage');
        const dailyGoalDisplay = document.getElementById('dailyGoal');
        const remainingGoalDisplay = document.getElementById('remainingGoal');
        const usageChartCanvas = document.getElementById('usageChart');
        const trackerForm = document.querySelector('.tracker-form');

        const DAILY_GOAL = 150; // Liters
        let totalLoggedUsage = 0;
        let usageByCategory = { Home: 0, School: 0, Industry: 0 };
        let usageChart; // To hold the Chart.js instance

        function updateTank() {
            const fillPercentage = (totalLoggedUsage / DAILY_GOAL) * 100;
            waterFill.style.height = `${Math.min(fillPercentage, 100)}%`; // Cap at 100%
            tankLabel.textContent = `${totalLoggedUsage} Liters Logged (Average Usage: ${DAILY_GOAL}L)`;

            todayUsageDisplay.textContent = `${totalLoggedUsage} L`;
            const remaining = DAILY_GOAL - totalLoggedUsage;
            remainingGoalDisplay.textContent = `${Math.max(0, remaining)} L`;
            remainingGoalDisplay.style.color = remaining >= 0 ? '#dc3545' : '#28a745'; // Red if not over, green if over

            // Update chart
            if (usageChart) {
                usageChart.data.datasets[0].data = Object.values(usageByCategory);
                usageChart.update();
            }
        }

        function logUsage(event) {
            event.preventDefault();
            const litersInput = document.getElementById('liters');
            const categorySelect = document.getElementById('category');

            const liters = parseInt(litersInput.value);
            const category = categorySelect.value;

            if (liters > 0 && category) {
                totalLoggedUsage += liters;
                usageByCategory[category] += liters;
                updateTank();
                // Data is NOT saved to localStorage anymore

                litersInput.value = ''; // Clear input
                categorySelect.value = ''; // Reset category
            }
            return false; // Prevent form submission
        }

        function initializeChart() {
            if (usageChartCanvas) {
                const ctx = usageChartCanvas.getContext('2d');
                usageChart = new Chart(ctx, {
                    type: 'pie', // Or 'bar'
                    data: {
                        labels: Object.keys(usageByCategory),
                        datasets: [{
                            data: Object.values(usageByCategory),
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.8)', // Blue for Home
                                'rgba(75, 192, 192, 0.8)', // Green for School
                                'rgba(153, 102, 255, 0.8)' // Purple for Industry
                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: false,
                                text: 'Water Usage Breakdown'
                            }
                        }
                    }
                });
            }
        }

        // Attach event listener for form submission
        if (trackerForm) {
            trackerForm.addEventListener('submit', logUsage);
        }

        // Initialize tracker on page load
        updateTank(); // Initialize the display to 0
        initializeChart();
        dailyGoalDisplay.textContent = `${DAILY_GOAL} L`; // Set initial goal display
    }

    // Lightbox Logic for Gallery (only runs if on gallary.html)
    if (window.location.pathname.includes('gallary.html')) {
        const galleryItems = document.querySelectorAll('.gallery-item img');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeLightboxBtn = document.getElementById('close-lightbox');

        galleryItems.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;
            });
        });

        if (closeLightboxBtn) {
            closeLightboxBtn.addEventListener('click', () => {
                lightbox.style.display = 'none';
            });
        }
        // Close lightbox if clicked outside image
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.style.display = 'none';
                }
            });
        }
    }
});