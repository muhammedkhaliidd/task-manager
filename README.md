# TaskManager

Angular 20 task management application.

## Project Overview and Architecture Decisions

Task Manager is a Senior Angular application for managing tasks with a modern, signal-based architecture.

### Key Features

- **Task Board** – Kanban-style columns (To Do, In Progress, Done) with drag-and-drop between columns
- **Task CRUD** – Create, edit, delete tasks with assignee, priority, due date, tags
- **Filtering & Search** – By status, priority, assignee; real-time search in titles and descriptions
- **Statistics Cards** – Total, completed, in-progress, overdue tasks
- **Task Analytics** – Chart.js doughnut charts for distribution by priority and status
- **Recent Activity Feed** – FAB-triggered overlay showing create/update/delete/status-change events
- **Team Management** – User list for task assignment (mock data)

### Key Technologies

- **Angular 20** – Standalone components, Signals, OnPush change detection
- **NgRx Signals** – SignalStore for state management (no traditional NgRx Store/Actions/Reducers)
- **Angular Material** – UI components and theming
- **Tailwind CSS** – Utility-first styling
- **Chart.js / ng2-charts** – Analytics and task distribution charts
- **json-server** – Mock REST API for development

### Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| **Standalone components** | Aligns with Angular v20 and improves tree-shaking |
| **OnPush change detection** | Reduces change detection cycles and improves performance |
| **NgRx SignalStore** | Reactive, fine-grained updates without boilerplate |
| **Smart/Dumb component pattern** | Clear separation of business logic and presentation |
| **Lazy-loaded feature routes** | Smaller initial bundle and faster first load |
| **Functional HTTP interceptors** | Modern, tree-shakeable approach for caching and retry |
| **httpResource for GET requests** | Eager, signal-based fetching with automatic sync to stores |

### Project Structure

```
src/app/
├── constants/          # API endpoints and shared constants
├── core/               # Core module, interceptors, layout services
├── features/           # Feature modules (dashboard, tasks, team, analytics, etc.)
├── shared/             # Reusable components, pipes, validators, services
└── app.config.ts       # Root application configuration
```

---

## Setup and Installation Instructions

### Prerequisites

- **Node.js** 18.x or 20.x
- **npm** 9.x or later

### Installation

1. Clone the repository and navigate to the project directory:

   ```bash
   cd task-manager
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application (see [Available scripts and commands](#available-scripts-and-commands)).

### Mock Data

The app uses `db.json` at the project root. json-server serves it on port 3000. The file is pre-populated with tasks and statistics; no data generation step is required to run the app.

To regenerate mock data with fresh dates (e.g. before submission), run the assignment data generator:

```bash
node senior-frontend-test/data-fetching/generate-data.js
```

This writes `tasks.json` and `statistics.json` to `senior-frontend-test/data-fetching/`. To use that data, copy or merge it into `db.json` (the app expects `{ tasks: [...], statistics: [...] }`).

---

## Environment Configuration

The application uses a constants file for API configuration instead of environment files.

### API Configuration

Edit `src/app/constants/apis.ts`:

```typescript
const API_URL = 'http://localhost:3000';  // Change for production

export const APIS = {
  tasks: API_URL + '/tasks',
  statistics: API_URL + '/statistics',
};
```

- **Development**: json-server runs on `http://localhost:3000` and serves `db.json`
- **Production**: Update `API_URL` to your backend base URL before building

### Bypassing Cache

Add the `X-Skip-Cache: true` header to any GET request to bypass the cache interceptor.

---

## Available Scripts and Commands

| Command | Description |
|---------|-------------|
| `npm start` | Starts json-server (port 3000) and Angular dev server (port 4200) concurrently |
| `npm run api` | Runs json-server only (`--watch db.json --port 3000`) |
| `ng serve` | Starts Angular dev server (requires API running separately for full functionality) |
| `npm run build` | Production build; output in `dist/task-manager` |
| `npm run watch` | Development build with watch mode |
| `npm test` | Runs unit tests (Karma + Jasmine) |
| `npm run lint` | Runs ESLint on `src/**/*.{ts,html}` |
| `npm run lint:fix` | Runs ESLint with auto-fix |
| `npm run format` | Formats code with Prettier |
| `npm run format:check` | Checks formatting without writing |
| `npm run prepare` | Runs automatically on `npm install`; configures Husky for pre-commit hooks |

---

## Design Patterns and State Management

### State Management (NgRx SignalStore)

- **TASKS_STORE** (`features/tasks/store/`): Tasks, statistics, filters, loading states; computed signals for filtered and categorized tasks
- **TEAM_STORE** (`features/team/store/`): Team members and loading state
- **ACTIVITY_STORE** (`features/activity/store/`): Recent activity items for the feed (client-side only)

Stores use `withState`, `withComputed`, and `withMethods` for reactive updates. No Actions, Reducers, or Effects.

### Smart vs. Dumb Components

- **Smart components**: Use SignalStore, handle business logic, coordinate API calls (e.g. `Dashboard`, `DashboardFilter`, `TaskForm`)
- **Dumb components**: Pure presentation, inputs/outputs only (e.g. `TaskCard`, `CustomInput`, `LettersCircleContainer`)

### API Services

- **TasksApiService**: Fetches tasks via `httpResource`, syncs to `TASKS_STORE`; handles create, update, delete
- **StatisticsApiService**: Fetches statistics via `httpResource`, syncs to `TASKS_STORE`

### Reactive Forms

- Forms use `FormControl`, `FormGroup`, `FormArray` with custom validators
- Example: `maxArrayLength(5)` for tags validation

---

## Testing Strategy

- **Framework**: Jasmine + Karma
- **Coverage**: Aim for 80%+ on components and services
- **Mocking**: Use `TestBed`, `HttpTestingController`, and stub services
- **Lint**: ESLint (including JSDoc rules) is run via `npm run lint`

### Test Organization

- Unit tests: `*.spec.ts` next to each component/service
- Interceptor tests: `cache.interceptor.spec.ts`, `retry.interceptor.spec.ts`

---

## Performance Optimization Techniques

| Technique | Implementation |
|-----------|----------------|
| **OnPush change detection** | All components use `ChangeDetectionStrategy.OnPush` |
| **Lazy loading** | Feature routes use `loadComponent()` for code splitting |
| **HTTP response caching** | Cache interceptor caches GET responses for 5 minutes; mutating requests invalidate cache |
| **Computed signals** | Derived state (e.g. filtered tasks) uses `computed()` for memoization |
| **Event coalescing** | `provideZoneChangeDetection({ eventCoalescing: true })` |
| **trackBy / track** | Lists use `track` in `@for` to minimize DOM updates |
| **Skeleton loaders** | Loading states use skeleton components to improve perceived performance |

---

## Known Limitations and Future Improvements

### Known Limitations

- API base URL is hardcoded in constants (no `.env` support)
- Cache is in-memory only; cleared on page refresh
- No offline or PWA support
- No real-time collaboration or WebSocket updates
- json-server is for development only; not suitable for production

### Future Improvements

- [ ] Environment-based configuration (e.g. `environment.ts` or `.env`)
- [ ] Persistent cache (e.g. IndexedDB) for better offline experience
- [ ] End-to-end tests (Cypress or Playwright)
- [ ] Virtual scrolling for large task lists
- [ ] Internationalization (i18n)
- [ ] Dark mode toggle
- [ ] Export tasks (CSV/PDF)
- [ ] Real backend integration with authentication

---

## Documentation

- **JSDoc**: Complex logic is documented with JSDoc comments
- **Standards**: [docs/JSDOC_GUIDE.md](docs/JSDOC_GUIDE.md)
- **Enforcement**: `npm run lint`
