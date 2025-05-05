# How to Set Up Cloudflare Wrangler on Windows 11 with PowerShell

This guide walks you through installing and using Wrangler on Windows 11 + PowerShell—both for new projects and existing repositories.

---

## ✅ Prerequisites

- **Node.js** (v16.13+): https://nodejs.org/  
- **Cloudflare account** (free tier is fine)  
- **PowerShell** (built into Windows 11; recommended over CMD)  
- *(Optional)* Visual Studio Code  

---

## 1. Install Wrangler

```powershell
npm install -g wrangler
wrangler --version
```

---

## 2. Authenticate with Cloudflare

```powershell
wrangler login
```

This will open your browser to authorize Wrangler against your Cloudflare account.

---

## 3. Create a New Worker Project

1. Navigate to your development folder:

   ```powershell
   cd C:\Projects
   ```

2. Scaffold a new Worker:

   ```powershell
   wrangler init my-worker
   ```

3. When prompted, choose:
   - A template (e.g. `hello-world`)  
   - TypeScript or JavaScript  
   - Whether to install dependencies  

   **Resulting folder tree**  
   ```
   my-worker/
   ├── wrangler.toml   (or wrangler.jsonc)
   └── src/
       └── index.ts    (or index.js)
   ```

> **⚠️ Pitfall #1:**  
> Make sure your config file (`wrangler.toml` or `wrangler.jsonc`) lives in the project root—if it’s misplaced, Wrangler won’t find it.

---

## 4. Configure `wrangler.toml`

```toml
name               = "my-worker"
main               = "src/index.ts"
account_id         = "YOUR_ACCOUNT_ID"
compatibility_date = "2025-05-04"
workers_dev        = true
compatibility_flags = ["nodejs_compat"]
```

> **⚠️ Pitfall #2:**  
> If `main` points to a non-existent or mis-named file, `wrangler deploy` will fail.

---

## 5. Deploy the Worker

```powershell
cd C:\Projects\my-worker
wrangler deploy
```

If you see “entry-point not found,” specify it explicitly:

```powershell
wrangler deploy src/index.ts
```

On success, you’ll get a URL like:

```
https://my-worker.YOUR_SUBDOMAIN.workers.dev
```

---

## 6. View Logs

Tail live logs:

```powershell
wrangler tail
```

---

## 7. Connect to an Existing Project

1. Clone the repo:

   ```powershell
   git clone git@github.com:yourname/your-worker.git
   cd your-worker
   ```

2. Ensure `wrangler.toml` (or `.jsonc`) is present.  
3. Authenticate & deploy:

   ```powershell
   wrangler login
   wrangler deploy
   ```

> **⚠️ Pitfall #3:**  
> Always `cd` into the folder containing `wrangler.toml` before running Wrangler commands.

---

## 🔧 Optional Tips

- **Preview locally**:  
  ```powershell
  wrangler dev
  ```  
  Runs at http://localhost:8787

- **Store secrets**:  
  ```powershell
  wrangler secret put API_KEY
  ```

- **Delete a Worker**:  
  ```powershell
  wrangler delete
  ```

---

## 🛠 Troubleshooting Summary

| Problem                                | Solution                                                       |
|----------------------------------------|----------------------------------------------------------------|
| Missing entry-point to Worker script   | Ensure `main` in config matches your file (e.g. `src/index.ts`). |
| Could not find zone for worker.js      | Don’t pass filenames to `wrangler tail`; just run `wrangler tail`. |
| Wrong working directory                | Double-check you’re in the project root (where your config lives). |
| Deployed nothing                       | Verify `src/index.ts` (or `.js`) exists and exports a valid handler. |

---

## ✏️ Example Minimal Worker (`src/index.ts`)

```ts
export default {
  async fetch(request: Request): Promise<Response> {
    return new Response("Hello from your Cloudflare Worker!", {
      headers: { "Content-Type": "text/plain" },
    });
  },
};
```

---

## 📚 Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)  
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/cli-wrangler/)  
- [Example Worker Templates](https://github.com/cloudflare/templates)  
