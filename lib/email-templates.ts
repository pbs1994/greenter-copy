// Templates d'emails Greenter - Design cohérent avec le site

interface OrderData {
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  shippingAddress?: {
    line1?: string
    line2?: string
    city?: string
    postal_code?: string
  }
  productName: string
  amount: number
  orderDate: string
}

// ============================================
// 1. EMAIL DE CONFIRMATION CLIENT
// ============================================
export const orderConfirmationTemplate = (order: OrderData) => `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de commande - Greenter</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%;">
          
          <!-- Header avec gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #1B6B3A 0%, #228B47 50%, #0D9488 100%); border-radius: 16px 16px 0 0; padding: 40px 40px 50px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <img src="https://greenter.fr/logo.png" alt="Greenter" width="140" style="display: block; margin-bottom: 24px;">
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="background-color: rgba(255,255,255,0.2); border-radius: 50%; width: 56px; height: 56px; text-align: center; vertical-align: middle;">
                          <span style="font-size: 28px;">✓</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Commande confirmée</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 8px;">
                    <p style="margin: 0; color: rgba(255,255,255,0.85); font-size: 16px;">
                      Merci ${order.customerName.split(' ')[0]} ! Votre commande a bien été enregistrée.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 16px;">
                    <span style="display: inline-block; background-color: rgba(255,255,255,0.15); color: #ffffff; padding: 8px 16px; border-radius: 20px; font-size: 14px;">
                      N° de commande : <strong style="font-family: monospace;">${order.orderNumber}</strong>
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contenu principal -->
          <tr>
            <td style="background-color: #ffffff; padding: 0 40px;">
              
              <!-- Carte produit -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: -20px;">
                <tr>
                  <td style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); padding: 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="80" style="vertical-align: top;">
                          <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #EBF7EE 0%, #D4ECDB 100%); border-radius: 12px; text-align: center; line-height: 80px;">
                            <img src="https://greenter.fr/kstar.png" alt="${order.productName}" width="60" style="vertical-align: middle;">
                          </div>
                        </td>
                        <td style="padding-left: 20px; vertical-align: top;">
                          <h3 style="margin: 0 0 4px; color: #1A1A1A; font-size: 18px; font-weight: 600;">${order.productName}</h3>
                          <p style="margin: 0 0 12px; color: #737373; font-size: 14px;">Onduleur hybride avec stockage LiFePO4</p>
                          <table role="presentation" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="background-color: #f5f5f5; padding: 4px 10px; border-radius: 4px; margin-right: 8px;">
                                <span style="color: #525252; font-size: 12px;">🔋 10 000 cycles</span>
                              </td>
                              <td width="8"></td>
                              <td style="background-color: #f5f5f5; padding: 4px 10px; border-radius: 4px;">
                                <span style="color: #525252; font-size: 12px;">☀️ 6 kW</span>
                              </td>
                              <td width="8"></td>
                              <td style="background-color: #f5f5f5; padding: 4px 10px; border-radius: 4px;">
                                <span style="color: #525252; font-size: 12px;">🛡️ Garantie 10 ans</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Services inclus -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 20px; background-color: #EBF7EE; border-radius: 8px; padding: 16px;">
                      <tr>
                        <td>
                          <p style="margin: 0 0 12px; color: #1B6B3A; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Services inclus</p>
                          <table role="presentation" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="color: #1B6B3A; font-size: 14px; padding-right: 24px;">🚚 Livraison</td>
                              <td style="color: #1B6B3A; font-size: 14px; padding-right: 24px;">🔧 Installation</td>
                              <td style="color: #1B6B3A; font-size: 14px;">⚙️ Mise en service</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Adresse de livraison -->
              ${order.shippingAddress ? `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 24px;">
                <tr>
                  <td style="border-left: 3px solid #0D9488; padding-left: 16px;">
                    <p style="margin: 0 0 4px; color: #737373; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Adresse de livraison</p>
                    <p style="margin: 0; color: #1A1A1A; font-size: 14px; line-height: 1.6;">
                      ${order.customerName}<br>
                      ${order.shippingAddress.line1 || ''}
                      ${order.shippingAddress.line2 ? `<br>${order.shippingAddress.line2}` : ''}
                      <br>${order.shippingAddress.postal_code || ''} ${order.shippingAddress.city || ''}
                    </p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Récapitulatif -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 32px; border-top: 1px solid #E5E5E5; padding-top: 24px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 16px; color: #1A1A1A; font-size: 16px; font-weight: 600;">Récapitulatif</h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="color: #737373; font-size: 14px; padding: 8px 0;">Date</td>
                        <td style="color: #1A1A1A; font-size: 14px; padding: 8px 0; text-align: right;">${order.orderDate}</td>
                      </tr>
                      <tr>
                        <td style="color: #737373; font-size: 14px; padding: 8px 0;">Produit</td>
                        <td style="color: #1A1A1A; font-size: 14px; padding: 8px 0; text-align: right;">${order.amount.toLocaleString('fr-FR')} €</td>
                      </tr>
                      <tr>
                        <td style="color: #737373; font-size: 14px; padding: 8px 0;">Livraison</td>
                        <td style="color: #1B6B3A; font-size: 14px; padding: 8px 0; text-align: right; font-weight: 500;">Offerte</td>
                      </tr>
                      <tr>
                        <td style="color: #737373; font-size: 14px; padding: 8px 0;">Installation</td>
                        <td style="color: #1B6B3A; font-size: 14px; padding: 8px 0; text-align: right; font-weight: 500;">Incluse</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="border-top: 1px solid #E5E5E5; padding-top: 16px;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="color: #1A1A1A; font-size: 16px; font-weight: 600;">Total TTC</td>
                              <td style="color: #1A1A1A; font-size: 20px; font-weight: 700; text-align: right;">${order.amount.toLocaleString('fr-FR')} €</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Prochaines étapes -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 32px; background-color: #f9fafb; border-radius: 12px; padding: 24px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 20px; color: #1A1A1A; font-size: 16px; font-weight: 600;">Prochaines étapes</h3>
                    
                    <!-- Étape 1 -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 16px;">
                      <tr>
                        <td width="40" style="vertical-align: top;">
                          <div style="width: 32px; height: 32px; background-color: #1B6B3A; border-radius: 50%; text-align: center; line-height: 32px; color: #ffffff; font-size: 14px; font-weight: 600;">1</div>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0 0 2px; color: #1A1A1A; font-size: 14px; font-weight: 600;">Confirmation par email ✓</p>
                          <p style="margin: 0; color: #737373; font-size: 13px;">Vous recevez ce récapitulatif avec votre facture en pièce jointe.</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Étape 2 -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 16px;">
                      <tr>
                        <td width="40" style="vertical-align: top;">
                          <div style="width: 32px; height: 32px; background-color: #E5E5E5; border-radius: 50%; text-align: center; line-height: 32px; color: #737373; font-size: 14px; font-weight: 600;">2</div>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0 0 2px; color: #1A1A1A; font-size: 14px; font-weight: 600;">Livraison</p>
                          <p style="margin: 0; color: #737373; font-size: 13px;">Livraison à domicile sous 5 à 10 jours ouvrés.</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Étape 3 -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="40" style="vertical-align: top;">
                          <div style="width: 32px; height: 32px; background-color: #E5E5E5; border-radius: 50%; text-align: center; line-height: 32px; color: #737373; font-size: 14px; font-weight: 600;">3</div>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0 0 2px; color: #1A1A1A; font-size: 14px; font-weight: 600;">Installation & mise en service</p>
                          <p style="margin: 0; color: #737373; font-size: 13px;">Installation complète en 1 journée par nos techniciens certifiés RGE.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Note facture -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 24px;">
                <tr>
                  <td style="background-color: #FEF3C7; border-radius: 8px; padding: 16px;">
                    <p style="margin: 0; color: #92400E; font-size: 14px;">
                      📎 <strong>Votre facture est jointe à cet email</strong> au format PDF.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Contact -->
          <tr>
            <td style="background-color: #0F4D2A; padding: 32px 40px; margin-top: 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 4px; color: #ffffff; font-size: 16px; font-weight: 600;">Une question ?</p>
                    <p style="margin: 0 0 20px; color: rgba(255,255,255,0.7); font-size: 14px;">Lun - Ven : 8h - 19h</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-right: 12px;">
                          <a href="tel:+33609455056" style="display: inline-block; background-color: #ffffff; color: #0F4D2A; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
                            📞 06 09 45 50 56
                          </a>
                        </td>
                        <td>
                          <a href="mailto:contact@greenter.fr?subject=Commande ${order.orderNumber}" style="display: inline-block; background-color: rgba(255,255,255,0.15); color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500;">
                            ✉️ Envoyer un email
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #ffffff; border-radius: 0 0 16px 16px; padding: 24px 40px; text-align: center;">
              <p style="margin: 0 0 8px; color: #1B6B3A; font-size: 13px; font-weight: 600;">Certifié RGE • QualiPAC • QualiPV • Qualibat</p>
              <p style="margin: 0; color: #A3A3A3; font-size: 12px;">
                GREEN TER - SASU au capital de 50 000,00 € - RCS Paris 977 485 721<br>
                38 Rue de Ménilmontant, 75020 Paris
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

// ============================================
// 2. EMAIL DE NOTIFICATION ADMIN
// ============================================
export const orderNotificationTemplate = (order: OrderData) => `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle commande - Greenter</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0D9488 0%, #1B6B3A 100%); border-radius: 16px 16px 0 0; padding: 32px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <img src="https://greenter.fr/logo.png" alt="Greenter" width="120" style="display: block; margin-bottom: 16px;">
                  </td>
                  <td style="text-align: right;">
                    <span style="display: inline-block; background-color: #22C55E; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600;">
                      💰 NOUVELLE VENTE
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Montant -->
          <tr>
            <td style="background-color: #ffffff; padding: 32px 40px; text-align: center; border-bottom: 1px solid #E5E5E5;">
              <p style="margin: 0 0 8px; color: #737373; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Montant de la commande</p>
              <p style="margin: 0; color: #1B6B3A; font-size: 48px; font-weight: 700;">${order.amount.toLocaleString('fr-FR')} €</p>
              <p style="margin: 8px 0 0; color: #A3A3A3; font-size: 14px;">TTC • Paiement confirmé</p>
            </td>
          </tr>

          <!-- Détails -->
          <tr>
            <td style="background-color: #ffffff; padding: 32px 40px;">
              
              <!-- Infos commande -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="background-color: #f9fafb; border-radius: 12px; padding: 20px;">
                    <h3 style="margin: 0 0 16px; color: #1A1A1A; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">📦 Commande</h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="color: #737373; font-size: 14px; padding: 6px 0;">N° de commande</td>
                        <td style="color: #1A1A1A; font-size: 14px; padding: 6px 0; text-align: right; font-family: monospace; font-weight: 600;">${order.orderNumber}</td>
                      </tr>
                      <tr>
                        <td style="color: #737373; font-size: 14px; padding: 6px 0;">Date</td>
                        <td style="color: #1A1A1A; font-size: 14px; padding: 6px 0; text-align: right;">${order.orderDate}</td>
                      </tr>
                      <tr>
                        <td style="color: #737373; font-size: 14px; padding: 6px 0;">Produit</td>
                        <td style="color: #1A1A1A; font-size: 14px; padding: 6px 0; text-align: right; font-weight: 500;">${order.productName}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Infos client -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="background-color: #EBF7EE; border-radius: 12px; padding: 20px;">
                    <h3 style="margin: 0 0 16px; color: #1B6B3A; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">👤 Client</h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="color: #525252; font-size: 14px; padding: 6px 0;">Nom</td>
                        <td style="color: #1A1A1A; font-size: 14px; padding: 6px 0; text-align: right; font-weight: 600;">${order.customerName}</td>
                      </tr>
                      <tr>
                        <td style="color: #525252; font-size: 14px; padding: 6px 0;">Email</td>
                        <td style="color: #1A1A1A; font-size: 14px; padding: 6px 0; text-align: right;">
                          <a href="mailto:${order.customerEmail}" style="color: #0D9488; text-decoration: none;">${order.customerEmail}</a>
                        </td>
                      </tr>
                      ${order.customerPhone ? `
                      <tr>
                        <td style="color: #525252; font-size: 14px; padding: 6px 0;">Téléphone</td>
                        <td style="color: #1A1A1A; font-size: 14px; padding: 6px 0; text-align: right;">
                          <a href="tel:${order.customerPhone}" style="color: #0D9488; text-decoration: none;">${order.customerPhone}</a>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Adresse livraison -->
              ${order.shippingAddress ? `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background-color: #f9fafb; border-radius: 12px; padding: 20px;">
                    <h3 style="margin: 0 0 12px; color: #1A1A1A; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">📍 Adresse de livraison</h3>
                    <p style="margin: 0; color: #1A1A1A; font-size: 14px; line-height: 1.6;">
                      ${order.customerName}<br>
                      ${order.shippingAddress.line1 || ''}
                      ${order.shippingAddress.line2 ? `<br>${order.shippingAddress.line2}` : ''}
                      <br>${order.shippingAddress.postal_code || ''} ${order.shippingAddress.city || ''}
                    </p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Note facture -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 24px;">
                <tr>
                  <td style="background-color: #FEF3C7; border-radius: 8px; padding: 16px;">
                    <p style="margin: 0; color: #92400E; font-size: 14px;">
                      📎 <strong>La facture est jointe à cet email</strong> au format PDF.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Actions -->
          <tr>
            <td style="background-color: #1A1A1A; padding: 24px 40px; text-align: center;">
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                <tr>
                  <td style="padding-right: 12px;">
                    <a href="mailto:${order.customerEmail}?subject=Votre commande ${order.orderNumber}" style="display: inline-block; background-color: #1B6B3A; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
                      ✉️ Contacter le client
                    </a>
                  </td>
                  ${order.customerPhone ? `
                  <td>
                    <a href="tel:${order.customerPhone}" style="display: inline-block; background-color: #0D9488; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
                      📞 Appeler
                    </a>
                  </td>
                  ` : ''}
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #ffffff; border-radius: 0 0 16px 16px; padding: 20px 40px; text-align: center;">
              <p style="margin: 0; color: #A3A3A3; font-size: 12px;">
                Email automatique généré par le système Greenter
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

// ============================================
// 3. EMAIL DE DEMANDE DE CONTACT
// ============================================
interface ContactData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

const serviceLabels: Record<string, string> = {
  pac: "Pompe à chaleur",
  solaire: "Panneaux solaires",
  isolation: "Isolation thermique",
  audit: "Audit énergétique",
  maintenance: "Maintenance / SAV",
  autre: "Autre",
}

export const contactRequestTemplate = (contact: ContactData) => `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle demande de contact - Greenter</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1B6B3A 0%, #0D9488 100%); border-radius: 16px 16px 0 0; padding: 32px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <img src="https://greenter.fr/logo.png" alt="Greenter" width="120" style="display: block;">
                  </td>
                  <td style="text-align: right;">
                    <span style="display: inline-block; background-color: #F59E0B; color: #ffffff; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 600;">
                      📩 NOUVEAU CONTACT
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Titre -->
          <tr>
            <td style="background-color: #ffffff; padding: 32px 40px 24px; text-align: center; border-bottom: 1px solid #E5E5E5;">
              <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #EBF7EE 0%, #D4ECDB 100%); border-radius: 50%; margin: 0 auto 16px; line-height: 64px;">
                <span style="font-size: 28px;">💬</span>
              </div>
              <h1 style="margin: 0 0 8px; color: #1A1A1A; font-size: 24px; font-weight: 700;">Nouvelle demande de contact</h1>
              <p style="margin: 0; color: #737373; font-size: 14px;">
                Reçue le ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </td>
          </tr>

          <!-- Contenu -->
          <tr>
            <td style="background-color: #ffffff; padding: 32px 40px;">
              
              <!-- Infos contact -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="background-color: #EBF7EE; border-radius: 12px; padding: 24px;">
                    <h3 style="margin: 0 0 20px; color: #1B6B3A; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">👤 Coordonnées</h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(27, 107, 58, 0.1);">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                              <td width="100" style="color: #525252; font-size: 14px;">Nom</td>
                              <td style="color: #1A1A1A; font-size: 16px; font-weight: 600;">${contact.name}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(27, 107, 58, 0.1);">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                              <td width="100" style="color: #525252; font-size: 14px;">Email</td>
                              <td>
                                <a href="mailto:${contact.email}" style="color: #0D9488; font-size: 14px; text-decoration: none; font-weight: 500;">${contact.email}</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                              <td width="100" style="color: #525252; font-size: 14px;">Téléphone</td>
                              <td>
                                <a href="tel:${contact.phone}" style="color: #0D9488; font-size: 14px; text-decoration: none; font-weight: 500;">${contact.phone}</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Sujet -->
              ${contact.service ? `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="background-color: #f9fafb; border-radius: 12px; padding: 20px;">
                    <h3 style="margin: 0 0 12px; color: #1A1A1A; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">🏷️ Sujet</h3>
                    <span style="display: inline-block; background: linear-gradient(135deg, #1B6B3A 0%, #0D9488 100%); color: #ffffff; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 500;">
                      ${serviceLabels[contact.service] || contact.service}
                    </span>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Message -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background-color: #f9fafb; border-radius: 12px; padding: 24px;">
                    <h3 style="margin: 0 0 16px; color: #1A1A1A; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">💬 Message</h3>
                    <div style="background-color: #ffffff; border-radius: 8px; padding: 20px; border-left: 4px solid #0D9488;">
                      <p style="margin: 0; color: #1A1A1A; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${contact.message}</p>
                    </div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Actions -->
          <tr>
            <td style="background-color: #1A1A1A; padding: 28px 40px; text-align: center;">
              <p style="margin: 0 0 20px; color: #A3A3A3; font-size: 13px;">Répondre rapidement au prospect</p>
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                <tr>
                  <td style="padding-right: 12px;">
                    <a href="mailto:${contact.email}?subject=Re: Votre demande - Greenter" style="display: inline-block; background-color: #1B6B3A; color: #ffffff; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-size: 14px; font-weight: 600;">
                      ✉️ Répondre par email
                    </a>
                  </td>
                  <td>
                    <a href="tel:${contact.phone}" style="display: inline-block; background-color: #0D9488; color: #ffffff; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-size: 14px; font-weight: 600;">
                      📞 Appeler
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #ffffff; border-radius: 0 0 16px 16px; padding: 20px 40px; text-align: center;">
              <p style="margin: 0; color: #A3A3A3; font-size: 12px;">
                Email automatique - Formulaire de contact greenter.fr
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

// Export des types
export type { OrderData, ContactData }
