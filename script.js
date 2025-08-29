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
    this.viewedJobs= document.getElementById('viewed-jobs')
    this.employerSignupBtn = document.getElementById('employerSignupBtn');
    this.employerLoginBtn = document.getElementById('employerLoginBtn');
    this.submitJobBtn = document.getElementById('submitJobBtn');
    this.postJobSection = document.getElementById('postJobSection');

    
    this.signUp = this.signUp.bind(this);
    this.browseJobs = this.browseJobs.bind(this);
    // this.postJobs = this.postJobs.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.fetchJobs = this.fetchJobs.bind(this);
    this.saveViewedJobs =this.saveViewedJobs.bind(this);
    // this.displayViewedJobs = this.displayViewedJobs.bind(this);

    if (this.signupBtn) {
      this.signupBtn.addEventListener('click', this.signUp);
    }
    if (this.browseBtn) {
          this.browseBtn.addEventListener('click', this.browseJobs);
        }

    if (this.loginBtn) {
      this.loginBtn.addEventListener('click', this.loginUser);
    }

    if (this.showSignupBtn && this.signupSection && this.modal) {
      this.showSignupBtn.addEventListener("click", () => {
        this.toggleSignup();
      });
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
  if (this.logoutBtn) {
  console.log("Attaching logout event"); 
  this.logoutBtn.addEventListener("click", this.logout.bind(this));
}

  }
  logout() {
  console.log('Logging out...');
  localStorage.removeItem('username');
  localStorage.removeItem('password');

  window.location.href = 'index.html';
}
  browseJobs(event) {
  event.preventDefault();
  console.log("Browse Jobs clicked!");
  this.modal.style.display = 'block';
}

  loginUser(event) {
  event.preventDefault();

  const inputUsername = document.getElementById('UserName')?.value.trim();
  const inputPassword = document.getElementById('password')?.value;

  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  if (!inputUsername || !inputPassword) {
    alert('Please enter both username and password.');
    return;
  }

  if (inputUsername === storedUsername && inputPassword === storedPassword) {
    alert(`Welcome ${storedUsername}!`);
    this.modal.style.display = 'none';
    window.location.href = "Dashboard.html";
  } else {
    alert('Invalid credentials. Please sign up.');
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
  employerSignUp() {
  const username = document.getElementById('employerUsername').value;
  const password = document.getElementById('employerPassword').value;
  
  if (username && password) {
    localStorage.setItem(`employer_${username}`, password);
    alert('Employer registered successfully.');
  } else {
    alert('Please fill out all fields.');
  }
}
  employerLogin() {
  const username = document.getElementById('employerLoginUser').value;
  const password = document.getElementById('employerLoginPass').value;

  const storedPassword = localStorage.getItem(`employer_${username}`);
  
  if (storedPassword === password) {
    alert(`Welcome, ${username}`);
    this.postJobSection.style.display = 'block';
    localStorage.setItem('activeEmployer', username);
  } else {
    alert('Invalid employer credentials.');
  }
}
  postJob() {
  const job = {
    title: document.getElementById('jobTitle').value,
    company: document.getElementById('companyName').value,
    location: document.getElementById('location').value,
    redirect_url: document.getElementById('redirectUrl').value
  };

  const postedJobs = JSON.parse(localStorage.getItem('postedJobs')) || [];
  postedJobs.push(job);
  localStorage.setItem('postedJobs', JSON.stringify(postedJobs));

  alert('Job posted successfully!');
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
displayViewedJobs() {
  const jobData = JSON.parse(localStorage.getItem('viewedJobs')) || [];
  const viewedContainer = document.getElementById('viewed-jobs');

  if (!viewedContainer) {
    console.error('Viewed jobs container not found');
    return;
  }

  viewedContainer.innerHTML = '';

  if (jobData.length === 0) {
    viewedContainer.innerHTML = '<p>No viewed jobs found.</p>';
    return;
  }

  jobData.forEach((job) => {
    const jobCard = document.createElement('div');
    jobCard.className = 'viewedjob-card bg-gray-100 p-4 rounded mb-3 shadow';

    const title = document.createElement('h3');
    title.className = 'text-lg font-semibold';
    title.textContent = job.title || 'No Title';

    const company = document.createElement('p');
    company.className = 'text-sm text-gray-600';
    company.textContent = job.company?.display_name || 'Unknown Company';

    const location = document.createElement('p');
    location.className = 'text-sm';
    location.textContent = job.location?.display_name || 'Remote / Unknown';

    const viewBtn = document.createElement('a');
    viewBtn.href = job.redirect_url || '#';
    viewBtn.target = '_blank';
    viewBtn.textContent = 'View Job';
    viewBtn.className = 'inline-block mt-2 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition';

    jobCard.appendChild(title);
    jobCard.appendChild(company);
    jobCard.appendChild(location);
    jobCard.appendChild(viewBtn);

    viewedContainer.appendChild(jobCard);
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
});




