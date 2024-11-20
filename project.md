# COMP.SE.140 Project – Fall 2024

## 1. Introduction

### Version history

| Version | Date   | Author | Notes                          |
|---------|--------|--------|--------------------------------|
| 0.1     | 03.11  | Kari   | Initial draft                  |
| 0.2     | 10.11  | Kari   | Second draft for the course staff |
| 1.0     | 11.11  | Kari   | First version published to students |
| 1.1     | 12.11  | Kari   | First fixes                    |

The main learning objective of this exercise is to gain practical experience with a CI/CD pipeline and learn how to automatically build, test, and deploy code to a hosting environment. Students will also gain a basic understanding of OPS-related activities. An average student is expected to spend approximately 50 hours on this project.

**Notes:**
- Students must read this document carefully.
- Additional instructions on deployment will be provided by 22.11.

---

## 1.2 The Schedule

- **11.11.2024:** Instructions disclosed, students can begin preparations.
- **12.11.2024:** Lecture discussions and clarifications.
- **22.11.2024:** Deployment instructions published.
- **09.12.2024:** Latest submission for 2024 course grading.
- **31.01.2025:** Final deadline to pass the course.

---

## 2. The Exercise

Students will build on a previous exercise (involving nginx) to create a CI/CD pipeline. Instead of advanced technologies, students will use basic open-source components to understand the process "under the hood."

### Key Steps:
1. **Pipeline Infrastructure with GitLab-CI**:
   - Add a second remote to your repository.
   - Install and register your GitLab runner.
   - Define the pipeline in `gitlab-ci.yaml` with at least the phases: build, test, deploy.
   - Test the pipeline with the current application.

2. **Automatic Testing Framework**:
   - Select testing tools (custom scripts are acceptable).
   - Implement API gateway functionality tests, with at least one test per API call.

3. **Development Using the Pipeline**:
   - Apply test-driven development (TDD).
   - Store tests in a `tests` folder at the root of the repository.
   - Demonstrate the test-first approach in the version history.

4. **Optional Features**:
   - Static analysis (e.g., jlint, pylint, SonarQube).
   - Monitoring and logging (e.g., service start times, request counts).

5. **Deployment**:
   - Instructions to be released by 22.11.

6. **End Report**:
   - Include an `EndReport.pdf` in the repository root.

---

## 3. Group Work Option

Individual work is recommended, but group work is allowed upon request, including:
- Group members (emails and student IDs).
- Additional proposed work or features.
- Work split and visibility plan.

---

## 4. GitLab Server Registration

- Use the server: [https://compse140.devops-gitlab.rd.tuni.fi](https://compse140.devops-gitlab.rd.tuni.fi).
- Register your GitLab runner following [GitLab CI runner setup guide](https://docs.gitlab.com/runner/install/index.html).

---

## 5. Application and Features

Extend the nginx service to an API gateway with the following REST-like API:

- **PUT /state**: Change system state (`INIT`, `PAUSED`, `RUNNING`, `SHUTDOWN`).
- **GET /state**: Retrieve the current state.
- **GET /run-log**: Get a log of state changes.
- **GET /request**: Simulate a GUI "request" button.

---

## 6. Constraints and Tips

- The system must work on Linux (use a VM if necessary).
- Implement monitoring and logging using a simple web page.

---

## 7. Submitting the Project

Use the `project` branch for submission.

---

## 8. Grading

### Breakdown:
- System functionality: **0–15%**
- Test-driven approach: **0–5%**
- CI/CD pipeline quality: **0–10%**
- Code quality and comments: **0–5%**
- End report quality: **0–5%**
- Optional features: **0–15%** (5% each).

Total points capped at 50%.

---

## 9. Assessment

- Ensure your system can be started with:
  ```bash
  $ git clone -b project <repo-url>
  $ cd <folder>
  $ docker-compose build --no-cache
  $ docker-compose up -d
