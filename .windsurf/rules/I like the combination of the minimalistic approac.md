## User Interface Design Document: BusinessGene

### Layout Structure

- **Main Dashboard:**
  - A grid-based or flexible row-based layout displaying "Business Idea Cards."
  - Each card will represent a saved business idea.
  - A prominent "Create New Business Idea" call-to-action button/area.
  - Minimal top navigation bar (e.g., Logo/Brand Name, User Profile/Account, Logout).
- **Project Studio View (when creating/editing a business idea):**
  - A clean, focused two-pane or single-column layout.
  - **Navigation:** A persistent, minimalist sidebar or a subtle top-tab navigation (e.g., icons or concise text links) to switch between modules: "1. Name \& Domain," "2. Logo Design," "3. Business Plan."
  - **Content Area:** The main area where the user interacts with the current module (e.g., input fields for name generation, logo description, or viewing the business plan).

### Core Components

- **Business Idea Card (Dashboard):**
  - Displays: Business Name (or placeholder if not yet generated), small thumbnail of Logo (or placeholder), and a status indicator (e.g., "Naming," "Logo Design," "Plan Complete," "Completed").
  - Actions: Click to open in Project Studio, quick actions like "Delete."
- **Input Fields:** Standard text fields, text areas, dropdowns/selects for style choices.
- **Buttons:** Clearly labeled buttons for primary actions (e.g., "Generate Names," "Create Logo," "Generate Plan," "Save," "Download") and secondary actions.
- **Progress Indicators:**
  - For the overall project on the dashboard card (as mentioned above).
  - Potentially subtle loading indicators during AI generation processes within modules.
- **Display Areas:**
  - For lists of generated names.
  - For displaying the generated logo.
  - For presenting the generated business plan content.
- **Modals/Pop-ups:** Used sparingly for confirmations (e.g., delete), API key inputs if needed (e.g., Namecheap, though likely backend), or brief explanatory notes.

### Interaction Patterns

- **Dashboard Interaction:**
  - Users click "Create New Business Idea" to enter the Project Studio for a new idea.
  - Users click an existing Business Idea Card to open it in the Project Studio, resuming at the appropriate module or a summary view.
  - Drag-and-drop for reordering cards on the dashboard could be a future consideration for Kanban-like prioritization but is not MVP. Status indicators will provide the primary tracking.
- **Project Studio Navigation:**
  - Users click on module navigation (sidebar/tabs) to move between Name, Logo, and Plan generation stages. The system should ideally guide them sequentially but allow revisiting previous steps.
  - Input data -> Click "Generate" -> View results -> Make selection/Proceed.
- **Saving:** Auto-save progress within a module where feasible, with a clear manual "Save \& Exit to Dashboard" or "Save \& Continue" button.
- **Export:** Clicking "Download" buttons for specific assets (logo, plan) will initiate file downloads in the chosen formats.

### Visual Design Elements \& Color Scheme

- **Aesthetic:** Minimalist, modern, clean, professional, and trustworthy. Emphasis on clarity and efficiency.
- **Color Scheme:**
  - **Primary:** A calm, neutral base (e.g., off-white, light grey).
  - **Accent:** One or two desaturated but distinct accent colors for calls-to-action, active states, and key information (e.g., a muted teal, a sophisticated blue, or a warm but not loud orange). Avoid overly bright or distracting colors.
  - **Text:** Dark grey or near-black for readability.
- **Iconography:** Simple, universally understood line icons for navigation, actions, and status indicators.
- **Imagery:** Primarily user-generated (logos). Placeholder images should be abstract and unobtrusive.
- **White Space:** Generous use of white space to reduce clutter and improve focus.

### Mobile, Web App, Desktop Considerations

- **Primary Platform:** Web App (SaaS).
- **Responsive Design:** The interface must be fully responsive.
  - **Desktop:** Utilize wider screens for the dashboard (e.g., multi-column card layout) and potentially two-pane layouts in the Project Studio.
  - **Tablet:** Adapt to a comfortable single or two-column layout for the dashboard, and a clear single-column or tabbed approach for the Project Studio.
  - **Mobile:** Single-column layouts for both dashboard (stacked cards) and Project Studio modules. Navigation will likely collapse into a hamburger menu or a bottom tab bar. Touch targets must be appropriately sized.
- Focus on ensuring core functionality (generation, viewing, exporting) is seamless on all device sizes.

### Typography

- **Font Family:** Choose a clean, modern, sans-serif typeface known for excellent readability on screens (e.g., Inter, Open Sans, Lato, Roboto).
- **Hierarchy:** Clear typographic hierarchy using font size, weight (e.g., regular, medium, bold), and color to differentiate headings, subheadings, body text, and labels.
- **Consistency:** Maintain consistent typography across all sections of the application.

### Accessibility (WCAG AA as a target)

- **Color Contrast:** Ensure sufficient color contrast between text and background, and for UI elements.
- **Keyboard Navigation:** All interactive elements should be navigable and operable using a keyboard.
- **Screen Reader Compatibility:** Use semantic HTML and ARIA attributes where necessary to ensure compatibility with screen readers.
- **Focus Indicators:** Clear and visible focus indicators for keyboard users.
- **Alternative Text:** Provide alt text for meaningful images and icons (if not purely decorative).
- **Resizable Text:** Ensure text can be resized using browser controls without breaking the layout.
- **Forms:** Clearly label all form fields and provide error messages in an accessible way.

---

This document outlines the UI design direction. Let me know if you have any further refinements or if this aligns well with your vision!
