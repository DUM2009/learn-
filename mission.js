/**
 * Mission System - Core Logic
 * Handles mission progression, quizzes, XP earning, and user progress tracking
 */

class MissionSystem {
    constructor(missionData) {
        this.mission = missionData;
        this.currentSectionIndex = 0;
        this.userAnswers = {};
        this.earnedXP = 0;
        this.completedSections = new Set();
        this.isInFinalQuiz = false;
        this.finalQuizAnswers = [];
        this.loadProgress();
    }

    /**
     * Load user progress from localStorage
     */
    loadProgress() {
        const savedProgress = localStorage.getItem(`mission_${this.mission.id}`);
        if (savedProgress) {
            const data = JSON.parse(savedProgress);
            this.currentSectionIndex = data.currentSectionIndex || 0;
            this.userAnswers = data.userAnswers || {};
            this.earnedXP = data.earnedXP || 0;
            this.completedSections = new Set(data.completedSections || []);
        }
    }

    /**
     * Save user progress to localStorage
     */
    saveProgress() {
        const data = {
            currentSectionIndex: this.currentSectionIndex,
            userAnswers: this.userAnswers,
            earnedXP: this.earnedXP,
            completedSections: Array.from(this.completedSections)
        };
        localStorage.setItem(`mission_${this.mission.id}`, JSON.stringify(data));
    }

    /**
     * Get current progress percentage
     */
    getProgressPercent() {
        return Math.round((this.completedSections.size / this.mission.sections.length) * 100);
    }

    /**
     * Render the mission interface
     */
    render() {
        this.renderHeader();
        this.renderSections();
        this.updateProgressBar();
    }

    /**
     * Render mission header with title and description
     */
    renderHeader() {
        document.getElementById('missionTitle').textContent = this.mission.title;
        document.getElementById('missionDescription').textContent = this.mission.description;
    }

    /**
     * Render all sections
     */
    renderSections() {
        const wrapper = document.getElementById('sectionsWrapper');
        wrapper.innerHTML = '';

        // Render learning sections
        this.mission.sections.forEach((section, index) => {
            const isUnlocked = index <= this.currentSectionIndex;
            const isCompleted = this.completedSections.has(section.id);
            
            const sectionEl = document.createElement('div');
            sectionEl.className = `section ${isUnlocked ? 'unlocked' : 'locked'} ${isCompleted ? 'completed' : ''}`;
            sectionEl.innerHTML = `
                <div class="section-header">
                    <div class="section-number-badge">
                        <span class="section-num">${index + 1}</span>
                        ${isCompleted ? '<span class="section-check">✓</span>' : ''}
                    </div>
                    <div class="section-info">
                        <h2>${section.icon} ${section.title}</h2>
                        <div class="section-meta">
                            <span class="xp-badge">+${section.xpReward} XP</span>
                            ${isCompleted ? '<span class="status-badge completed">Completed</span>' : '<span class="status-badge">In Progress</span>'}
                        </div>
                    </div>
                </div>
                <div class="section-body">
                    ${section.content}
                    <div class="section-quiz">
                        <h3>Quick Check 📋</h3>
                        <p class="quiz-question">${section.quiz.question}</p>
                        <div class="quiz-options" data-section-id="${section.id}" data-section-index="${index}">
                            ${section.quiz.options.map((option, optIdx) => `
                                <button class="quiz-option" data-correct="${option.correct}" data-option-index="${optIdx}">
                                    <span class="option-letter">${String.fromCharCode(65 + optIdx)})</span>
                                    <span class="option-text">${option.text}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;

            // Add event listeners to quiz options
            if (isUnlocked) {
                const options = sectionEl.querySelectorAll('.quiz-option');
                options.forEach(option => {
                    option.addEventListener('click', (e) => {
                        this.handleQuizAnswer(e, section, index);
                    });
                });
            }

            wrapper.appendChild(sectionEl);
        });

        // Render final quiz button after all sections are completed
        if (this.completedSections.size === this.mission.sections.length) {
            const finalQuizBtn = document.createElement('div');
            finalQuizBtn.className = 'final-quiz-section';
            finalQuizBtn.innerHTML = `
                <div class="final-quiz-card">
                    <div class="final-quiz-icon">🏆</div>
                    <h2>Ready for the Final Challenge?</h2>
                    <p>You've completed all sections! Take the final quiz to earn bonus XP and your badge.</p>
                    <button class="final-quiz-btn" onclick="missionSystem.startFinalQuiz()">Start Final Quiz 🚀</button>
                </div>
            `;
            wrapper.appendChild(finalQuizBtn);
        }
    }

    /**
     * Handle quiz answer selection
     */
    handleQuizAnswer(event, section, sectionIndex) {
        const button = event.target.closest('.quiz-option');
        if (!button) return;

        const isCorrect = button.dataset.correct === 'true';
        const optionIndex = button.dataset.optionIndex;
        const quizContainer = button.parentElement;

        // Disable all options
        quizContainer.querySelectorAll('.quiz-option').forEach(opt => {
            opt.disabled = true;
            opt.style.pointerEvents = 'none';
        });

        // Highlight selected answer
        button.classList.add(isCorrect ? 'correct' : 'incorrect');

        // Show feedback
        const feedbackEl = document.createElement('div');
        feedbackEl.className = `quiz-feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
        feedbackEl.innerHTML = `
            <span class="feedback-icon">${isCorrect ? '✓' : '✗'}</span>
            <span class="feedback-text">${section.quiz.feedback[isCorrect ? 'correct' : 'incorrect']}</span>
        `;
        quizContainer.appendChild(feedbackEl);

        // If correct, mark section as completed and award XP
        if (isCorrect) {
            this.showCorrectAnimation();
            
            // Mark section as completed
            if (!this.completedSections.has(section.id)) {
                this.completedSections.add(section.id);
                this.earnedXP += section.xpReward;
                this.showXPReward(section.xpReward);
                
                // Move to next section if available
                if (sectionIndex + 1 < this.mission.sections.length) {
                    this.currentSectionIndex = sectionIndex + 1;
                }
                
                this.saveProgress();
                
                // Refresh UI after short delay
                setTimeout(() => {
                    this.render();
                }, 800);
            }
        }
    }

    /**
     * Start the final quiz
     */
    startFinalQuiz() {
        this.isInFinalQuiz = true;
        this.renderFinalQuiz();
    }

    /**
     * Render the final quiz
     */
    renderFinalQuiz() {
        const wrapper = document.getElementById('sectionsWrapper');
        wrapper.innerHTML = '';

        const quizContainer = document.createElement('div');
        quizContainer.className = 'final-quiz-container';

        // Quiz Header
        const header = document.createElement('div');
        header.className = 'final-quiz-header';
        header.innerHTML = `
            <h1>🧬 The Code of Life - Final Quiz</h1>
            <p>Answer all 10 questions correctly to complete the mission!</p>
            <div class="quiz-progress">
                <span id="quizProgress">Question 1 of 10</span>
                <div class="quiz-progress-bar">
                    <div class="quiz-progress-fill" id="quizProgressFill" style="width: 10%"></div>
                </div>
            </div>
        `;
        quizContainer.appendChild(header);

        // Questions
        const questionsContainer = document.createElement('div');
        questionsContainer.className = 'final-quiz-questions';
        questionsContainer.id = 'questionsContainer';

        this.mission.finalQuiz.forEach((question, index) => {
            const questionEl = document.createElement('div');
            questionEl.className = `final-quiz-question ${index === 0 ? 'active' : ''}`;
            questionEl.dataset.questionIndex = index;
            questionEl.innerHTML = `
                <h3>Question ${index + 1} of 10</h3>
                <p class="question-text">${question.question}</p>
                <div class="final-quiz-options">
                    ${question.options.map((option, optIdx) => `
                        <button class="final-quiz-option" data-correct="${option.correct}">
                            <span class="option-circle">${String.fromCharCode(65 + optIdx)}</span>
                            <span class="option-text">${option.text}</span>
                        </button>
                    `).join('')}
                </div>
            `;

            // Add event listeners
            questionEl.querySelectorAll('.final-quiz-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    this.handleFinalQuizAnswer(e, index);
                });
            });

            questionsContainer.appendChild(questionEl);
        });

        quizContainer.appendChild(questionsContainer);
        wrapper.appendChild(quizContainer);
    }

    /**
     * Handle final quiz answer
     */
    handleFinalQuizAnswer(event, questionIndex) {
        const option = event.target.closest('.final-quiz-option');
        if (!option || option.disabled) return;

        const isCorrect = option.dataset.correct === 'true';
        const questionEl = document.querySelector(`[data-question-index="${questionIndex}"]`);
        const allOptions = questionEl.querySelectorAll('.final-quiz-option');

        // Disable all options
        allOptions.forEach(opt => {
            opt.disabled = true;
            opt.style.pointerEvents = 'none';
        });

        // Highlight answer
        allOptions.forEach(opt => {
            if (opt.dataset.correct === 'true') {
                opt.classList.add('correct');
            } else if (opt === option) {
                opt.classList.add('incorrect');
            }
        });

        // Store answer
        this.finalQuizAnswers[questionIndex] = isCorrect;

        // Show feedback with delay
        setTimeout(() => {
            if (questionIndex + 1 < this.mission.finalQuiz.length) {
                // Show next question
                this.showFinalQuizQuestion(questionIndex + 1);
            } else {
                // Show results
                this.showFinalQuizResults();
            }
        }, 1500);
    }

    /**
     * Show specific final quiz question
     */
    showFinalQuizQuestion(questionIndex) {
        const questions = document.querySelectorAll('.final-quiz-question');
        questions.forEach((q, idx) => {
            q.classList.remove('active');
            if (idx === questionIndex) {
                q.classList.add('active');
            }
        });

        // Update progress
        const percent = ((questionIndex + 1) / this.mission.finalQuiz.length) * 100;
        document.getElementById('quizProgressFill').style.width = percent + '%';
        document.getElementById('quizProgress').textContent = `Question ${questionIndex + 1} of 10`;
    }

    /**
     * Show final quiz results
     */
    showFinalQuizResults() {
        const correctAnswers = this.finalQuizAnswers.filter(ans => ans === true).length;
        const totalQuestions = this.mission.finalQuiz.length;
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);
        const bonusXP = Math.round((correctAnswers / totalQuestions) * 100);

        const wrapper = document.getElementById('sectionsWrapper');
        wrapper.innerHTML = `
            <div class="completion-screen">
                <div class="completion-badge">
                    <div class="badge-icon">🏆</div>
                    <h1>Mission Completed!</h1>
                </div>

                <div class="completion-stats">
                    <div class="stat-card">
                        <div class="stat-icon">✓</div>
                        <div class="stat-content">
                            <div class="stat-label">Correct Answers</div>
                            <div class="stat-value">${correctAnswers}/${totalQuestions}</div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-content">
                            <div class="stat-label">Accuracy</div>
                            <div class="stat-value">${percentage}%</div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">⭐</div>
                        <div class="stat-content">
                            <div class="stat-label">Bonus XP Earned</div>
                            <div class="stat-value">+${bonusXP} XP</div>
                        </div>
                    </div>
                </div>

                <div class="completion-xp-summary">
                    <h2>Total XP Earned</h2>
                    <div class="total-xp">${this.earnedXP + bonusXP}</div>
                    <div class="xp-breakdown">
                        <p>Sections: ${this.earnedXP} XP</p>
                        <p>Final Quiz Bonus: ${bonusXP} XP</p>
                    </div>
                </div>

                <div class="completion-achievements">
                    <h3>🎖️ Achievements Unlocked</h3>
                    <div class="achievement-list">
                        <div class="achievement-item unlocked">
                            <span class="achievement-icon">🧬</span>
                            <span class="achievement-name">Biology Basics</span>
                        </div>
                        <div class="achievement-item ${percentage >= 80 ? 'unlocked' : 'locked'}">
                            <span class="achievement-icon">💯</span>
                            <span class="achievement-name">Perfect Scholar</span>
                        </div>
                        <div class="achievement-item ${percentage >= 90 ? 'unlocked' : 'locked'}">
                            <span class="achievement-icon">🌟</span>
                            <span class="achievement-name">Expert Biologist</span>
                        </div>
                    </div>
                </div>

                <div class="completion-actions">
                    <button class="btn-primary" onclick="window.location.href='missions.html'">Back to Missions</button>
                    <button class="btn-secondary" onclick="missionSystem.resetMission()">Retake Mission</button>
                </div>
            </div>
        `;

        // Update final earnedXP for localStorage
        this.earnedXP += bonusXP;
        this.saveProgress();
    }

    /**
     * Reset mission progress
     */
    resetMission() {
        localStorage.removeItem(`mission_${this.mission.id}`);
        this.currentSectionIndex = 0;
        this.userAnswers = {};
        this.earnedXP = 0;
        this.completedSections = new Set();
        this.isInFinalQuiz = false;
        this.finalQuizAnswers = [];
        this.render();
        window.scrollTo(0, 0);
    }

    /**
     * Update progress bar
     */
    updateProgressBar() {
        const percent = this.getProgressPercent();
        document.getElementById('progressPercent').textContent = percent + '%';
        document.getElementById('progressBar').style.width = percent + '%';
        document.getElementById('sectionCounter').textContent = `${this.completedSections.size}/${this.mission.sections.length} Sections`;
    }

    /**
     * Show XP reward animation
     */
    showXPReward(xp) {
        const toast = document.getElementById('xpToast');
        document.getElementById('xpText').textContent = `+${xp} XP`;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }

    /**
     * Show correct answer animation
     */
    showCorrectAnimation() {
        const animation = document.getElementById('correctAnimation');
        animation.classList.add('show');
        setTimeout(() => {
            animation.classList.remove('show');
        }, 1000);
    }
}

// Initialize mission system when page loads
let missionSystem;
document.addEventListener('DOMContentLoaded', () => {
    missionSystem = new MissionSystem(missionData);
    missionSystem.render();
});
