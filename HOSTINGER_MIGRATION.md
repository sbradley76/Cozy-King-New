# Hostinger migration checklist

1. **Do not delete the existing Cozy King site yet.** Back up `public_html` and export the current MySQL database.
2. Confirm the current Hostinger plan supports Node.js Web Apps.
3. Create a staging Node app/subdomain first if possible.
4. Import/run `database/001_cozy_king_2.sql` against the existing Cozy King database.
5. Add the `.env` values in Hostinger's environment-variable UI. Do not commit `.env` to GitHub.
6. Verify dealer login against the existing `users` table.
7. Submit a test contract inquiry and confirm it reaches `cozy_contract_inquiries`.
8. Submit a test dealer order and confirm the parent/order-item rows are written correctly.
9. Test desktop + mobile routes and browser refreshes on nested React routes.
10. Only after staging validation, move the production domain to the Node app.
