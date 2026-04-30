# **📄 Product Requirements Document (PRD)**

**Project:** p5.js Portfolio Website  
**Owner:** Jake (Media Student)  
**Date:** April 2026

---

## **1\. 🧭 Overview**

This project is a personal portfolio website designed to showcase **11 p5.js projects** developed במהלך the semester. The goal is to present interactive works in a visually engaging, minimal, and professional format that highlights both creativity and technical skills.

The site should feel **clean, fast, and interactive**, with a strong emphasis on the projects themselves rather than heavy UI decoration.

---

## **2\. 🎯 Goals**

* Showcase all 11 p5.js projects clearly and interactively  
* Provide context (concept, process, tools) for each project  
* Create a cohesive visual identity (black & white minimal style preferred)  
* Ensure smooth performance for interactive sketches  
* Make the portfolio usable for:  
  * Professors (evaluation)  
  * Recruiters (quick impression)  
  * Peers (exploration)

---

## **3\. 👤 Target Users**

* **Primary:** Professors / evaluators  
* **Secondary:** Creative developers, designers, recruiters  
* **Tertiary:** General visitors interested in interactive media

---

## **4\. 🧱 Site Structure**

### **4.1 Pages**

#### **1\. Home Page**

* Short intro (name \+ focus: media / creative coding)  
* Featured projects (3–5 highlighted)  
* Quick navigation to all projects

#### **2\. Projects Page (Gallery)**

* Grid layout displaying all 11 projects  
* Each item includes:  
  * Thumbnail / preview  
  * Project title  
  * Short description (1–2 lines)

#### **3\. Project Detail Page (Template for all 11\)**

Each project has its own page with:

* Title  
* Interactive p5.js canvas (embedded)  
* Description:  
  * Concept  
  * What it does  
  * Interaction instructions  
* Development notes:  
  * Tools used  
  * Challenges  
* Optional:  
  * Images / process sketches  
  * Code link (GitHub)

#### **4\. About Page**

* Short bio  
* Skills (creative coding, media, etc.)  
* Tools: p5.js, JS, etc.

---

## **5\. ⚙️ Functional Requirements**

### **5.1 Core Features**

* Embed and run **p5.js sketches directly on page**  
* Responsive layout (desktop-first, but works on mobile)  
* Smooth navigation between projects  
* Fast loading (optimize assets)

### **5.2 Interaction**

* Hover effects on project cards  
* Click → opens project detail page  
* Optional:  
  * Keyboard navigation between projects  
  * Fullscreen mode for sketches

---

## **6\. 🎨 Design Requirements**

### **Style Direction:**

* Minimal (black & white)  
* Strong typography  
* Grid-based layout  
* Focus on content, not decoration

### **UI Elements:**

* Clean navigation bar  
* Consistent spacing  
* Subtle animations (fade, hover)

### **Inspiration:**

* Editorial / gallery style  
* Digital art portfolios

---

## **7\. 🧩 Technical Requirements**

### **Frontend:**

* HTML / CSS / JavaScript  
* p5.js integration

### **Optional Framework:**

* Vanilla JS (preferred for simplicity)  
* OR lightweight framework (e.g., React)

### **File Structure:**

* `/projects` (each project folder)  
* `/assets` (images, thumbnails)  
* `/components` (if using framework)

### **Performance:**

* Lazy load images  
* Optimize sketches (avoid heavy loops)

---

## **8\. 📦 Content Requirements**

For each of the 11 projects:

* Title  
* Thumbnail image / preview  
* Short description  
* Full description  
* p5.js sketch file  
* Optional:  
  * GitHub link  
  * Process images

---

## **9\. 🚀 Future Enhancements (Optional)**

* Filter projects by category (e.g., generative, interaction)  
* Dark/light toggle  
* Blog or process journal  
* Sound integration for sketches  
* Analytics (track views)

---

## **10\. ✅ Success Criteria**

* All 11 projects are accessible and working  
* Page loads under \~3 seconds  
* Clear navigation (no confusion)  
* Projects are the visual focus  
* Portfolio feels cohesive and intentional

---

## **11\. 🧪 Testing**

* Test on:  
  * Chrome / Safari  
  * Desktop \+ mobile  
* Check:  
  * p5.js sketches load correctly  
  * No lag or freezing  
  * Navigation works smoothly

