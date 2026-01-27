# JSDoc Documentation Standards

## Overview

This project uses JSDoc comments to document complex logic, classes, methods, and interfaces. JSDoc is integrated with ESLint to ensure consistent documentation.

## Why JSDoc with TypeScript?

While TypeScript provides type information, JSDoc adds:
- **Purpose and behavior** documentation
- **Usage examples** for complex functions
- **Parameter constraints** and edge cases
- **Return value details** beyond just the type
- Better IDE intellisense and hover information

## When to Document

### ✅ Always Document
- **Complex business logic** - Algorithms, calculations, state management
- **Public APIs** - Exported functions, classes, services, stores
- **Custom validators** - Form validation logic
- **SignalStore methods** - State management operations
- **HTTP interceptors** - Caching and error handling logic
- **Angular components** - Especially smart components with business logic

### ⚠️ Optional (Use Judgment)
- Simple getters/setters with obvious purpose
- Trivial one-liner functions
- Private utility functions (if obvious)

### ❌ Don't Document
- Constructor parameters (TypeScript/Angular handles this)
- Obvious code: `getName()` returning a name
- Type information (TypeScript already provides this)

## JSDoc Syntax

### Basic Structure

```typescript
/**
 * Brief description of what this does
 *
 * Detailed description if needed. Can span multiple lines.
 * Explain complex logic, edge cases, or important behaviors.
 *
 * @param paramName - Description of the parameter
 * @returns Description of what is returned
 */
```

### Key Rules for TypeScript + JSDoc

1. ❌ **DON'T include types** (TypeScript handles this):
   ```typescript
   // ❌ Bad - redundant type information
   /**
    * @param {string} name - User name
    * @returns {Promise<User>}
    */
   ```

2. ✅ **DO describe behavior and purpose**:
   ```typescript
   // ✅ Good - focuses on behavior
   /**
    * Fetches user data from the API and caches it locally
    *
    * @param name - The username to search for
    * @returns Promise resolving to the user object, or null if not found
    */
   ```

## Examples

### SignalStore Methods

```typescript
/**
 * Loads tasks with 5-minute cache TTL
 *
 * Checks cache age before making API calls. Cache is automatically
 * invalidated on task mutations (create/update/delete).
 *
 * @param forceRefresh - Skip cache and fetch fresh data
 * @returns Promise resolving when tasks are loaded into store
 */
async loadTasks(forceRefresh = false): Promise<void> {
  // implementation
}
```

### Custom Validators

```typescript
/**
 * Validates that due date is not in the past
 *
 * Business rules:
 * - Due date must be at least tomorrow (no same-day tasks)
 * - Due date cannot be more than 1 year in the future
 * - Null/empty values are allowed (tasks without deadlines)
 *
 * @param control - Form control containing the due date value
 * @returns Validation error object with error type, or null if valid
 */
export function futureDateValidator(control: AbstractControl): ValidationErrors | null {
  // implementation
}
```

### Angular Components

```typescript
/**
 * Task list component that displays and manages user tasks
 *
 * Features:
 * - Real-time task updates via SignalStore
 * - Task filtering and search
 * - Drag-and-drop task reordering (optional)
 *
 * Uses OnPush change detection for optimal performance.
 */
@Component({
  selector: 'app-task-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  /**
   * Handles task completion toggle
   *
   * Updates the task status both locally and on the server.
   * If server update fails, reverts the local change.
   *
   * @param taskId - Unique identifier of the task to toggle
   */
  toggleTask(taskId: string): void {
    // implementation
  }
}
```

## ESLint Enforcement

JSDoc is enforced through ESLint:
- **Classes** - JSDoc required
- **Methods** - JSDoc required
- **Functions** - JSDoc required
- **Interfaces** - JSDoc recommended

Run `npm run lint` to check JSDoc compliance.

## Best Practices

1. **Start with "what" and "why"**, not "how"
   - Good: "Validates user input to prevent XSS attacks"
   - Bad: "Calls sanitize() function on the input"

2. **Document side effects**
   ```typescript
   /**
    * Saves task to database
    *
    * Side effects:
    * - Updates localStorage cache
    * - Triggers task-saved analytics event
    * - Invalidates related task queries
    */
   ```

3. **Include examples for complex usage**
   ```typescript
   /**
    * @example
    * ```typescript
    * const result = await complexFunction({
    *   option1: true,
    *   option2: 'value'
    * });
    * ```
    */
   ```

4. **Describe error conditions**
   ```typescript
   /**
    * @throws {ValidationError} If task data validation fails
    * @throws {NetworkError} If API request times out (>30s)
    */
   ```

## Resources

- [JSDoc Official Documentation](https://jsdoc.app/)
- [TypeScript JSDoc Reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
