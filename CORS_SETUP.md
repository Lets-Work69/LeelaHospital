# CORS Configuration Guide

## How to Configure Multiple Frontend URLs

The backend now supports multiple CORS origins. You can configure one or more frontend URLs in your `.env` file.

### Single URL (Development)
```env
CORS_ORIGIN=http://localhost:5173
```

### Multiple URLs (Development + Production)
```env
CORS_ORIGIN=http://localhost:5173,https://yourdomain.com
```

### Multiple URLs with Different Ports
```env
CORS_ORIGIN=http://localhost:5173,http://localhost:3000,https://yourdomain.com,https://www.yourdomain.com
```

## Important Notes

1. **Comma-separated**: Use commas to separate multiple URLs
2. **No spaces**: Don't add spaces between URLs (or they will be trimmed automatically)
3. **Include protocol**: Always include `http://` or `https://`
4. **No trailing slash**: Don't add trailing slashes to URLs

## Examples

✅ Correct:
```env
CORS_ORIGIN=http://localhost:5173,https://example.com
```

❌ Incorrect:
```env
CORS_ORIGIN=http://localhost:5173, https://example.com  # Extra spaces
CORS_ORIGIN=localhost:5173,example.com                  # Missing protocol
CORS_ORIGIN=http://localhost:5173/,https://example.com/ # Trailing slashes
```

## Testing

After updating your `.env` file, restart your backend server for changes to take effect.
