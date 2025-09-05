class JobListing {
  constructor() {
    this.modal = document.getElementById('modal');
    this.browseBtn = document.getElementById('browsebtn');
    this.postBtn = document.getElementById('postbtn');
    this.loginBtn = document.getElementById('loginbtn');
    this.signupBtn = document.getElementById('signupbtn');
    this.showSignupBtn = document.getElementById("showSignup");
    this.signupSection = document.getElementById("signupSection");
    this.jobsElement = document.getElementById('jobs');
    this.welcomeContainer = document.getElementById("greet");
    this.logoutBtn = document.getElementById("logoutBtn");
    this.applied = document.getElementById('applied');
    this.viewedJobs = document.getElementById('viewed-jobs');
    this.heroContainer=document.getElementById('hero-container');
    this.searchby = document.getElementById ('searchby');
    this.searchQuery = document.getElementById('searchQuery');



    this.employerSignupBtn = document.getElementById('employerSignupBtn');
    this.employerLoginBtn = document.getElementById('employerLoginBtn');
    this.submitJobBtn = document.getElementById('submitJobBtn');
    this.postJobSection = document.getElementById('postJobSection');
    this.postJobsBtn = document.getElementById("postJobsBtn");
    this.employerLoginModal = document.getElementById("employerLoginModal");
    this.employerSignupSection = document.getElementById("employerSignupSection");
    this.showEmployerSignup = document.getElementById("showEmployerSignup");
    this.showEmployerLogin = document.getElementById("showEmployerLogin");

    this.signUp = this.signUp.bind(this);
    this.browseJobs = this.browseJobs.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.fetchJobs = this.fetchJobs.bind(this);
    this.saveViewedJobs = this.saveViewedJobs.bind(this);

    this.addEventListeners();

    // localStorage.setItem('username', 'admin');
    // localStorage.setItem('password', '1234');
  }

  addEventListeners() {
    if (this.signupBtn) this.signupBtn.addEventListener('click', this.signUp);
    if (this.browseBtn) this.browseBtn.addEventListener('click', this.browseJobs);
    if (this.loginBtn) this.loginBtn.addEventListener('click', this.loginUser);

    if (this.showSignupBtn && this.signupSection && this.modal) {
      this.showSignupBtn.addEventListener("click", () => this.toggleSignup());
    }

    if (this.employerSignupBtn) {
      this.employerSignupBtn.addEventListener('click', this.employerSignUp.bind(this));
    }
    if (this.employerLoginBtn) {
      this.employerLoginBtn.addEventListener('click', this.employerLogin.bind(this));
    }
    if (this.submitJobBtn) {
      this.submitJobBtn.addEventListener('click', this.postJob.bind(this));
    }

    if (this.postJobsBtn && this.employerLoginModal) {
      this.postJobsBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.employerSignupSection?.classList.add("hidden");
        this.employerLoginModal?.classList.remove("hidden");
      });
    }

    if (this.showEmployerSignup) {
      this.showEmployerSignup.addEventListener("click", (e) => {
        e.preventDefault();
        this.employerLoginModal.classList.add("hidden");
        this.employerSignupSection.classList.remove("hidden");
      });
    }

    if (this.showEmployerLogin) {
      this.showEmployerLogin.addEventListener("click", (e) => {
        e.preventDefault();
        this.employerSignupSection.classList.add("hidden");
        this.employerLoginModal.classList.remove("hidden");
      });
    }

    if (this.logoutBtn) {
      this.logoutBtn.addEventListener("click", this.logout.bind(this));
    }

    window.addEventListener('click', (event) => {
      if (event.target === this.modal) {
        this.modal.style.display = 'none';
      }
    });
    window.addEventListener('click', (event) => {
      if (event.target === this.signupSection) {
        this.signupSection.style.display = 'none';
      }
    });
    const overlay = document.getElementById('overlay');
if (overlay) {
  overlay.addEventListener('click', () => {
    this.modal.style.display = 'none';
    this.signupSection.style.display= 'none';
    overlay.style.display = 'none';

    const heroContainer = document.querySelector('.hero-container');
    if (heroContainer) {
      heroContainer.style.opacity = '1'; 
    }
  });
}
  }


  init() {
  this.fetchJobs();

  const activeUser = localStorage.getItem("activeUser");
  if (this.welcomeContainer) {
    if (activeUser) {
      this.welcomeContainer.innerHTML = `<p class="text-2xl text-purple font-semibold">Welcome ${activeUser}!👋</p>`;
    } else {
      this.welcomeContainer.innerHTML = `<p class="text-red-500">No user found. Please log in.</p>`;
    }
  }
}


  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('activeEmployer');
    window.location.href = 'index.html';
  }

  browseJobs(event) {
    event.preventDefault();
    this.modal.style.display = 'block';

     const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.style.display = 'block';
  }
     
   const heroContainer = document.querySelector('.hero-container');
  if (heroContainer) {
    heroContainer.style.opacity = '50%';
  }
  }

  signUp(event) {
  event.preventDefault();
  const newUsername = document.getElementById('newusername').value.trim();
  const newPassword = document.getElementById('newpassword').value;

  if (!newUsername || !newPassword) {
    alert('Please enter all fields.');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || {};

  if (users[newUsername]) {
    alert('You already have an account.');
  } else {
    
    users[newUsername] = newPassword;
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! You can now log in.');
    this.signupSection.style.display = 'none';
    this.modal.style.display = 'block';
  }
}


   toggleSignup() {
    this.signupSection.style.display = "block";
    this.modal.style.display = "none";
    const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.style.display = 'block';
  }
     
   const heroContainer = document.querySelector('.hero-container');
  if (heroContainer) {
    heroContainer.style.opacity = '50%';
  }
  }

  loginUser(event) {
  event.preventDefault();
  const inputUsername = document.getElementById('UserName')?.value.trim();
  const inputPassword = document.getElementById('password')?.value;

  if (!inputUsername || !inputPassword) {
    alert('Please enter both username and password.');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || {};

  if (users[inputUsername] === inputPassword) {
    alert(`Welcome ${inputUsername}!`);
    localStorage.setItem('activeUser', inputUsername); 
    this.modal.style.display = 'none';
    window.location.href = "Dashboard.html";
  } else {
    alert('Invalid credentials. Please sign up.');
  }
}


  employerSignUp() {
    const username = document.getElementById('employerUsername').value;
    const password = document.getElementById('employerPassword').value;
    const companyName = document.getElementById('companyName').value;
    const companyAddress = document.getElementById('companyAddress').value;
    const position = document.getElementById('employerPosition').value;
    const email = document.getElementById('employerEmail').value;

    if (!username || !password || !companyName || !companyAddress || !position || !email) {
      alert('Please fill out all fields.');
      return;
    }

    localStorage.setItem(`employer_${username}`, password);
    localStorage.setItem(`employer_profile_${username}`, JSON.stringify({
      companyName,
      companyAddress,
      position,
      email
    }));

    // alert('Registration successful! You can now log in.');
    this.employerSignupSection?.classList.add("hidden");
    this.employerLoginModal?.classList.remove("hidden");
  }

  employerLogin() {
    const username = document.getElementById('employerLoginUser').value;
    const password = document.getElementById('employerLoginPass').value;

    const storedPassword = localStorage.getItem(`employer_${username}`);

    if (storedPassword === password) {
      alert(`Welcome, ${username}`);
      localStorage.setItem('activeEmployer', username);
      window.location.href = 'EmployerDashboard.html';
    } else {
      alert('Invalid employer credentials.');
    }
  }

  postJob(event) {
    event.preventDefault();

    const job = {
      title: document.getElementById('jobTitle').value,
      location: document.getElementById('location').value,
      description: document.getElementById('jobDescription')?.value || "No description provided",
      redirect_url: document.getElementById('redirectUrl').value,
      company: localStorage.getItem('activeEmployer') || "Unknown Company"
    };

    const jobs = JSON.parse(localStorage.getItem('postedJobs')) || [];
    jobs.unshift(job); 
    localStorage.setItem('postedJobs', JSON.stringify(jobs));

    alert('Job posted successfully!');
    document.getElementById('jobForm')?.reset();
  }

  async fetchJobs() {
    const apiJobs = [];
    try {
      const res = await fetch(`https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=54aa27d4&app_key=9889b9d4c1512fac9bfaeeab5c9dc4fc&results_per_page=10&what=remote`);
      const data = await res.json();
      apiJobs.push(...(data.results || []));
    } catch (error) {
      console.error("API error:", error);
    }

    const customJobs = JSON.parse(localStorage.getItem('postedJobs')) || [];

    const allJobs = [...customJobs, ...apiJobs];

    if (this.jobsElement) {
      this.jobsElement.innerHTML = '';

      if (allJobs.length === 0) {
        this.jobsElement.innerHTML = '<p>No jobs found.</p>';
        return;
      }

      allJobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card bg-blue-50 p-4 rounded shadow mb-4';
        jobCard.innerHTML = `
          <h3 class="text-lg font-semibold">${job.title}</h3>
          <p class="text-sm text-gray-600">${job.company || 'Unknown Company'}</p>
          <p class="text-sm">${job.location || 'Unknown Location'}</p>
        `;

        const viewBtn = document.createElement('button');
        viewBtn.className = "mt-4 bg-blue-900 hover:bg-blue-200 text-white font-semibold py-2 px-4 rounded";
        viewBtn.textContent = 'View Job';
        viewBtn.addEventListener('click', () => this.saveViewedJobs(job));
        jobCard.appendChild(viewBtn);

        this.jobsElement.appendChild(jobCard);
      });
    }
  }

  saveViewedJobs(job) {
    const viewedJobs = JSON.parse(localStorage.getItem('viewedJobs')) || [];
    const alreadyViewed = viewedJobs.find(j => j.title === job.title && j.company === job.company);

    if (!alreadyViewed) {
      viewedJobs.push({
        title: job.title,
        company: job.company,
        location: job.location,
        url: job.redirect_url
      });
      localStorage.setItem('viewedJobs', JSON.stringify(viewedJobs));
    }

    window.open(job.redirect_url, '_blank');
  }

  displayViewedJobs() {
    const jobs = JSON.parse(localStorage.getItem('viewedJobs')) || [];
    const container = document.getElementById('viewed-jobs');
    if (!container) return;

    container.innerHTML = jobs.length === 0 ? '<p>No viewed jobs yet.</p>' : '';

    jobs.forEach(job => {
      const card = document.createElement('div');
      card.className = 'bg-gray-100 p-4 rounded mb-3 shadow';
      card.innerHTML = `
        <h3 class="text-lg font-semibold">${job.title}</h3>
        <p class="text-sm text-gray-600">${job.company}</p>
        <p class="text-sm">${job.location}</p>
        <a href="${job.url}" target="_blank" class="inline-block mt-2 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">View Job</a>
      `;
      container.appendChild(card);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const jobListing = new JobListing();
  jobListing.init();

  if (document.getElementById('jobs')) {
    jobListing.init();
  }

  if (document.getElementById('viewed-jobs')) {
    jobListing.displayViewedJobs();
  }

 
  if (document.getElementById("employerName")) {
    const employer = localStorage.getItem('activeEmployer');
    if (employer) {
      document.getElementById('employerName').textContent = employer;
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('activeEmployer');
        window.location.href = 'index.html';
      });
    }

    const jobForm = document.getElementById('jobForm');
    if (jobForm) {
      jobForm.addEventListener('submit', (e) => jobListing.postJob(e));
    }
  }
});
