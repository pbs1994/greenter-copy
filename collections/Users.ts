import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    description: 'Seuls les admins peuvent créer de nouveaux utilisateurs',
  },
  auth: {
    verify: false,
    tokenExpiration: 3600,
    maxLoginAttempts: 5,
    lockTime: 600000,
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
    forgotPassword: {
      generateEmailHTML: (args) => {
        const token = args?.token
        const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.greenter.fr'}/admin/reset-password?token=${token}`
        return `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Réinitialisation de mot de passe - Greenter</title>
          </head>
          <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 20px;">
              <tr>
                <td align="center">
                  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
                    
                    <!-- Header -->
                    <tr>
                      <td style="background:linear-gradient(135deg,#166534,#0f766e);padding:32px 40px;text-align:center;">
                        <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">🌿 Greenter</h1>
                        <p style="margin:8px 0 0;color:#bbf7d0;font-size:14px;">Espace Administration</p>
                      </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                      <td style="padding:40px;">
                        <h2 style="margin:0 0 16px;color:#111827;font-size:20px;font-weight:600;">Réinitialisation de mot de passe</h2>
                        <p style="margin:0 0 24px;color:#6b7280;font-size:15px;line-height:1.6;">
                          Bonjour,<br><br>
                          Vous avez demandé à réinitialiser votre mot de passe pour accéder à l'administration de <strong>greenter.fr</strong>.
                        </p>
                        
                        <!-- CTA Button -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" style="padding:8px 0 32px;">
                              <a href="${resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#166534,#0f766e);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:600;letter-spacing:0.3px;">
                                Réinitialiser mon mot de passe
                              </a>
                            </td>
                          </tr>
                        </table>

                        <p style="margin:0 0 16px;color:#6b7280;font-size:13px;line-height:1.6;">
                          Ce lien est valable pendant <strong>1 heure</strong>. Si vous n'avez pas fait cette demande, ignorez cet email — votre mot de passe reste inchangé.
                        </p>

                        <!-- Fallback URL -->
                        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin-top:24px;">
                          <p style="margin:0 0 8px;color:#374151;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Lien de secours</p>
                          <p style="margin:0;word-break:break-all;font-size:12px;color:#6b7280;">${resetUrl}</p>
                        </div>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:24px 40px;text-align:center;">
                        <p style="margin:0;color:#9ca3af;font-size:12px;">
                          © ${new Date().getFullYear()} Greenter · <a href="https://www.greenter.fr" style="color:#16a34a;text-decoration:none;">greenter.fr</a>
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `
      },
      generateEmailSubject: () => '🔐 Réinitialisation de votre mot de passe - Greenter Admin',
    },
  },
  access: {
    // Seuls les users authentifiés peuvent lire la liste des users
    read: ({ req }) => !!req.user,
    // Seuls les admins peuvent créer de nouveaux users
    // Note: Payload autorise automatiquement la création du premier user (onboarding)
    create: ({ req }) => req.user?.role === 'admin',
    // Les users peuvent modifier leur propre profil, les admins peuvent tout modifier
    update: ({ req }) => {
      if (req.user?.role === 'admin') return true
      // Un user peut modifier son propre profil
      return {
        id: {
          equals: req.user?.id,
        },
      }
    },
    // Seuls les admins peuvent supprimer des users
    delete: ({ req }) => req.user?.role === 'admin',
    // Désactiver complètement l'accès admin pour les non-authentifiés
    admin: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      defaultValue: 'editor',
      required: true,
      access: {
        // Seuls les admins peuvent changer les rôles
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
    {
      name: 'firstName',
      type: 'text',
      label: 'Prénom',
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Nom',
    },
  ],
}
