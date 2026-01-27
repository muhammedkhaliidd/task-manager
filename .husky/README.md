# Husky Pre-commit Hook

## What It Does

Automatically runs code quality checks before each commit to ensure:
- Code is properly linted with ESLint
- Code is properly formatted with Prettier
- Only clean, formatted code gets committed

## How It Works

When you run `git commit`, the pre-commit hook automatically:

1. **Backs up** your current changes
2. **Runs lint-staged** which executes:
   - `eslint --fix` on staged `.ts` files
   - `prettier --write --parser angular` on staged `.html` files
   - `eslint --fix` on staged `.html` files
   - `prettier --write` on staged `.scss`, `.css`, `.json` files
3. **Applies** any auto-fixes from linting/formatting
4. **Proceeds** with the commit if all checks pass
5. **Blocks** the commit if there are unfixable errors

## Configuration

- **Hook file**: `.husky/pre-commit`
- **Git hooks path**: `.husky` (configured in git config)
- **Lint-staged config**: `package.json` → `lint-staged` section

## Testing the Hook

To verify the hook is working:

```bash
# Make a change
echo "console.log('test')" >> src/app/app.ts

# Stage it
git add src/app/app.ts

# Try to commit - hook will run
git commit -m "test"

# You'll see lint-staged output showing it's working
```

## Bypassing the Hook (Not Recommended)

If you absolutely need to commit without running checks:

```bash
git commit --no-verify -m "message"
```

**Warning**: This is strongly discouraged as it bypasses all quality checks.

## Troubleshooting

### Hook not running?

1. Check if the hook file exists and is executable:
   ```bash
   ls -la .husky/pre-commit
   ```

2. Verify git hooks path is configured:
   ```bash
   git config core.hooksPath
   # Should output: .husky
   ```

3. If needed, make the hook executable:
   ```bash
   chmod +x .husky/pre-commit
   ```

4. Reinstall Husky:
   ```bash
   npm run prepare
   ```
