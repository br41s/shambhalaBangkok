# Maintenance Plan

## Routine Tasks

### Weekly
- [ ] Log in to admin panel (`/admin/`) and review content
- [ ] Update event statuses (mark past events as `past`)
- [ ] Check site is live and loading correctly

### Monthly
- [ ] Review Plausible analytics dashboard
- [ ] Update upcoming events for the next month
- [ ] Publish at least 1 blog post
- [ ] Check for and address any 404 errors in analytics
- [ ] Review newsletter subscriber growth

### Quarterly
- [ ] Run `pnpm audit` to check for security vulnerabilities
- [ ] Update dependencies: `pnpm update`
- [ ] Test security headers at securityheaders.com
- [ ] Run Lighthouse audit (target: all scores > 95)
- [ ] Review and rotate API keys (Brevo, n8n webhooks)
- [ ] Change admin password and rotate `ADMIN_SESSION_SECRET` if needed
- [ ] Test all forms and interactive elements
- [ ] Review and update content for accuracy
- [ ] Verify all external links still work

### Annually
- [ ] Review and update privacy policy
- [ ] Review and update terms of use
- [ ] Major dependency updates (Next.js, React, Tailwind)
- [ ] Full QA pass using [QA-CHECKLIST.md](QA-CHECKLIST.md)
- [ ] Review roadmap and plan next year's features
- [ ] Review site architecture for potential improvements
- [ ] Backup all content (export Markdown files)

---

## Dependency Updates

### Safe Updates (patch/minor)
```bash
pnpm update           # Update to latest compatible
pnpm outdated         # Check what's available
pnpm audit            # Check for vulnerabilities
```

### Major Updates (breaking changes)
1. Create a branch: `git checkout -b update/[package-name]`
2. Update the package: `pnpm add [package]@latest`
3. Run build: `pnpm build`
4. Run type check: `pnpm type-check`
5. Test locally: `pnpm dev`
6. If everything works, merge to main

### Critical Dependencies to Monitor
| Package | Current | Check Frequency | Notes |
|---|---|---|---|
| next | 16.x | Monthly | Framework — test thoroughly |
| react | 19.x | Monthly | Core dependency |
| tailwindcss | 4.x | Quarterly | Styling — visual regression check |
| typescript | 5.x | Quarterly | Dev dependency, low risk |
| gray-matter | latest | Quarterly | Markdown frontmatter parsing |

---

## Monitoring

### Uptime
- **Vercel Status**: Vercel provides built-in uptime monitoring
- **Alternative**: Set up UptimeRobot (free) to ping the homepage every 5 minutes

### Performance
- **Vercel Analytics**: Built-in Web Vitals tracking
- **PageSpeed Insights**: Monthly manual check
- **Plausible**: Page load times and visitor metrics

### Errors
- **Vercel Logs**: Check Functions → Logs for API errors
- **n8n**: Check workflow execution history for failed runs

---

## Backup Strategy

### Code
- Git repository is the single source of truth
- Enable GitHub repository backup / mirroring if desired

### Content
- All content is in Git (Markdown files in `content/`)
- Each deployment is a snapshot of the full site

### Export Content
```bash
# Export all content files
tar -czf content-backup-$(date +%Y%m%d).tar.gz content/
```

---

## Incident Response

### Site Down
1. Check Vercel status page: status.vercel.com
2. Check deployment status in Vercel dashboard
3. Check recent Git commits for breaking changes
4. If recent deploy broke it: rollback in Vercel (Deployments → Promote previous)
5. If DNS issue: check domain settings in Vercel

### Content Issue
1. Identify the problematic content file
2. Fix via admin panel (`/admin/events` or `/admin/posts`) or edit the Markdown file directly
3. Changes via admin panel auto-commit to GitHub → auto-deploys in ~1-2 minutes

### Security Issue
1. Follow procedures in [SECURITY.md](SECURITY.md)
2. Revoke compromised credentials immediately
3. Deploy fix or rollback

---

## Contact

| Role | Responsibility |
|---|---|
| Developer | Technical maintenance, deployments, bug fixes |
| Content Lead | Editorial calendar, content updates, admin panel management |
| Community Manager | Social channels, community engagement, event coordination |
