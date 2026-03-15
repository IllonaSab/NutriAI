const theme = {
  colors: {
    // Fonds
    background: '#F5F0E8',      // beige clair (fond principal)
    surface: '#FFFFFF',          // blanc (cards, inputs)
    border: '#E8DCC8',           // beige bordure

    // Marque
    primary: '#C8A84B',          // doré (bouton principal)
    primaryDark: '#A8882B',      // doré foncé (hover)
    secondary: '#3B2A1A',        // marron foncé (titres)

    // Texte
    textPrimary: '#3B2A1A',      // marron foncé
    textSecondary: '#9E8A6E',    // marron clair (sous-titres)
    textLight: '#FFFFFF',        // blanc (texte sur bouton doré)

    // Messages chat
    messagePrimary: '#D4AF37',   // doré (message IA)
    messageSecondary: '#FDF6EC', // blanc (message user)

    // Input 
    inputBackground: '#FDF6EC',
    inputBorder: '#D4AF37',
    placeholder: '#5A3D21',
  
    // Repas validés 
    repasBackground: '#E8F5E9',
    repasBorder: '#81C784',
    repasText: '#2E7D32',
  
    // Statuts
    success: '#6BAF6B',
    error: '#E07070',
  },

  fonts: {
    primary: 'Georgia, serif',
  },

  borderRadius: {
    small: '8px',
    medium: '16px',
    large: '24px',
    round: '50%',
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '1px',
    xl: '32px',
  }
}

export default theme