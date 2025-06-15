    const projects = [
      {
        title: "Underactuated Gripper with Active Surfaces",
        date: "June 2022 - December 2022",
        img: "./src/projects/Gripper.jpg",
        desc: "Desgined and built a parallel two-fingered gripper with an underactuated gear mechanism; the gripper also has timing belts on the surface, making it capable of simple in-hand manipulation. Using open-loop force control, it is capable of picking up a paper cup without deforming it, and using the timing belt mechanism, it is also able to pick up a flatly laid piece of paper.",
        skills: ["Mechanical Design","CAD","Arduino","3D Printing"],
      },
      {
        title: "Racebuddy: An Adaptive Playseat for Children with Spina Bifida",
        date: "September 2024 - ",
        img: "./src/projects/Playseat.JPG",
        desc: "Designed an adaptive, custom-contoured playseat that allows a child with spina bifida to interact with his peers. The design incorporates modular components fitted together with different mechanisms like snap-fits, spring-loaded mechanisms, dovetails, and more.",
        skills: ["CAD","3D Printing","Mechanical Design","Manufacturing"],
      },
      {
        title: "Smart Sliding Klotski Puzzle",
        date: "June 2023 - September 2023",
        img: "./src/projects/Klotski.jpeg",
        desc: "Built and programmed a smart sliding puzzle capable of recognizing the board state. Designed custom PCB and casing to use Hall-effect sensors to recognize distinct pieces and RAM-like access to read sensor data.",
        skills: ["Arduino", "PCB Design", "CAD"],
      },
      {
        title: "FPV Drone",
        date: "May 2025",
        img: "./src/projects/FPV.JPG",
        desc: "Assembled a 2.5-inch FPV drone with custom sourced components, including flight controller, motors, ERLS reciever, and air unit; tuned PID for the drone.",
        skills: ["PID","Mechanical Design"],
      },
      {
        title: "Robotic Anthropomorphic Hand",
        date: "January 2022",
        img: "./src/projects/Hand.png",
        desc: "Designed and built an robotic hand with linkage mechanisms, controlling it with servos. Uses OpenCV and mediapipe to identify whether a finger is outstretched or not, and mimicks the movements. You can also play rock, paper, scissors with it :).",
        skills: ["OpenCV","Mechanical Design","Arduino"],
      }
    ];

    function createProjectCard(project, idx) {
      return `
        <div class="project-card">
          <img src="${project.img}" alt="${project.title} image" class="project-img">
          <div class="project-info">
            <h2>${project.title}</h2>
            <p class="project-date">${project.date}</p>
            <p>${project.desc}</p>
            <ul class="skills-list">
              ${project.skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    }

    function renderProjects() {
      const container = document.getElementById('projects-list');
      container.innerHTML += projects.map(createProjectCard).join('');
    }

    renderProjects();