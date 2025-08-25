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
    this.applied = document.getElementById('applied')

    
    this.signUp = this.signUp.bind(this);
    this.browseJobs = this.browseJobs.bind(this);
    this.postJobs = this.postJobs.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.fetchJobs = this.fetchJobs.bind(this);
    this.saveViewedJobs =this.saveViewedJobs.bind(this);

    if (this.signupBtn) {
      this.signupBtn.addEventListener('click', this.signUp);
    }

    if (this.browseBtn) {
      this.browseBtn.addEventListener('click', this.browseJobs);
    }

    if (this.postBtn) {
      this.postBtn.addEventListener('click', this.postJobs);
    }

    if (this.loginBtn) {
      this.loginBtn.addEventListener('click', this.loginUser);
    }

    if (this.showSignupBtn && this.signupSection && this.modal) {
      this.showSignupBtn.addEventListener("click", () => {
        this.toggleSignup();
      });
    }

    window.addEventListener('click', (event) => {
      if (event.target === this.modal) {
        this.modal.style.display = 'none';
      }
    });

   
    localStorage.setItem('username', 'admin');
    localStorage.setItem('password', '1234');
  }

  init() {
  this.fetchJobs();

  const storedUsername = localStorage.getItem("username");

  if (this.welcomeContainer) {
    if (storedUsername) {
      this.welcomeContainer.innerHTML = `<p class="text-xl font-semibold">Welcome ${storedUsername}!</p>`;
    } else {
      this.welcomeContainer.innerHTML = `<p class="text-red-500">No user found. Please log in.</p>`;
    }
  }
    this.logoutBtn.addEventListener("click", this.logout.bind(this));
  }
  logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('password');

  window.location.href = 'index.html';
}


  browseJobs(event) {
    event.preventDefault();
    this.modal.style.display = 'block';
  }

  loginUser(event) {
    event.preventDefault();
    const inputUsername = document.getElementById('UserName').value;
    const inputPassword = document.getElementById('password').value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (inputUsername === storedUsername && inputPassword === storedPassword) {
      alert(`Welcome ${storedUsername}!`);
      this.modal.style.display = 'none';
      window.location.href ="Dashboard.html";
      

    } else {
      alert('Invalid credentials. Please sign up.');
    }
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (username && password) {
      window.location.href = 'Dashboard.html';
    }

  }

  toggleSignup() {
    this.signupSection.style.display = "block";
    this.modal.style.display = "none";
  }

  signUp(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newusername').value;
    const newPassword = document.getElementById('newpassword').value;
    const storedUsername = localStorage.getItem('username');

    if (newUsername === storedUsername) {
      alert('You already have an account. Please log in.');
    } else {
      localStorage.setItem('username', newUsername);
      localStorage.setItem('password', newPassword);
      alert('Registration successful! You can now log in.');
      this.signupSection.style.display = 'none';
      this.modal.style.display = 'block';
    }
  }
  saveViewedJobs(job) {
  const viewedJobs = JSON.parse(localStorage.getItem('viewedJobs')) || [];

  const alreadyViewedJob = viewedJobs.find(j => j.id === job.id);

  if (!alreadyViewedJob) {
    viewedJobs.push({
      id: job.id || `${job.title} - ${job.company.display_name}`,
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      url: job.redirect_url
    });

    localStorage.setItem('viewedJobs', JSON.stringify(viewedJobs));
  }

  window.open(job.redirect_url, '_blank');
}


  postJobs() {
    console.log('Posting a job...');
  }

  filterJobs() {
    console.log('Filtering jobs...');
  }

  async fetchJobs() {
  const appId = '54aa27d4';
  const appKey = '9889b9d4c1512fac9bfaeeab5c9dc4fc';
  const url = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=15&what=remote`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const jobs = data.results || [];

    console.log('Full API response:', data);

    if (this.jobsElement) {
      this.jobsElement.innerHTML = '';

      if (jobs.length === 0) {
        this.jobsElement.innerHTML = '<p>No jobs found.</p>';
        return;
      }

      jobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card bg-blue-50 p-4 rounded shadow mb-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200';
        jobCard.innerHTML = `
          <h3 class="text-lg font-semibold">${job.title}</h3>
          <p class="text-sm text-gray-600">${job.company.display_name || 'Unknown Company'}</p>
          <p class="text-sm">${job.location.display_name || 'Remote / Unknown'}</p>
        `;
        const viewBtn = document.createElement('button');
        viewBtn.className = "mt-4 bg-blue-900 hover:bg-blue-200 text-white font-semibold py-2 px-4 rounded";
        viewBtn.textContent = 'View Job'
        viewBtn.addEventListener('click', () => this.saveViewedJobs(job));

jobCard.appendChild(viewBtn);
this.jobsElement.appendChild(jobCard);

      });
    }
  } catch (error) {
    console.error('Error fetching jobs:', error);
    if (this.jobsElement) {
      this.jobsElement.innerHTML = `<p class="text-red-500">Failed to load jobs. Try again later.</p>`;
    }
  }
}


}
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById('jobs')) {
    const jobListing = new JobListing();
    jobListing.init();
  }

  if (document.getElementById('viewed-jobs')) {
    new Dashboard();
  }
});

