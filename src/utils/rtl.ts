// Utilidades para soporte RTL (Right-to-Left)

/**
 * Clases CSS para soporte RTL usando Tailwind CSS
 */
export const rtlClasses = {
  // Márgenes
  marginLeft: 'ml-4 rtl:ml-0 rtl:mr-4',
  marginRight: 'mr-4 rtl:mr-0 rtl:ml-4',
  
  // Padding
  paddingLeft: 'pl-4 rtl:pl-0 rtl:pr-4',
  paddingRight: 'pr-4 rtl:pr-0 rtl:pl-4',
  
  // Texto
  textLeft: 'text-left rtl:text-right',
  textRight: 'text-right rtl:text-left',
  
  // Flexbox
  flexRowReverse: 'flex-row rtl:flex-row-reverse',
  
  // Posicionamiento
  left: 'left-4 rtl:left-auto rtl:right-4',
  right: 'right-4 rtl:right-auto rtl:left-4',
  
  // Bordes
  borderLeft: 'border-l rtl:border-l-0 rtl:border-r',
  borderRight: 'border-r rtl:border-r-0 rtl:border-l',
  
  // Transformaciones
  rotateIcon: 'rtl:rotate-180',
  
  // Espaciado específico
  spaceX: 'space-x-4 rtl:space-x-reverse',
  
  // Grid
  gridFlow: 'grid-flow-col rtl:grid-flow-col-dense'
};

/**
 * Hook para obtener clases RTL dinámicamente
 */
export const useRTLClasses = (isRTL: boolean) => {
  const getClass = (ltrClass: string, rtlClass: string) => {
    return isRTL ? rtlClass : ltrClass;
  };

  const getMargin = (side: 'left' | 'right', value: string = '4') => {
    if (side === 'left') {
      return isRTL ? `mr-${value}` : `ml-${value}`;
    }
    return isRTL ? `ml-${value}` : `mr-${value}`;
  };

  const getPadding = (side: 'left' | 'right', value: string = '4') => {
    if (side === 'left') {
      return isRTL ? `pr-${value}` : `pl-${value}`;
    }
    return isRTL ? `pl-${value}` : `pr-${value}`;
  };

  const getTextAlign = (align: 'left' | 'right') => {
    if (align === 'left') {
      return isRTL ? 'text-right' : 'text-left';
    }
    return isRTL ? 'text-left' : 'text-right';
  };

  const getPosition = (side: 'left' | 'right', value: string = '4') => {
    if (side === 'left') {
      return isRTL ? `right-${value}` : `left-${value}`;
    }
    return isRTL ? `left-${value}` : `right-${value}`;
  };

  const getFlexDirection = () => {
    return isRTL ? 'flex-row-reverse' : 'flex-row';
  };

  const getBorder = (side: 'left' | 'right') => {
    if (side === 'left') {
      return isRTL ? 'border-r' : 'border-l';
    }
    return isRTL ? 'border-l' : 'border-r';
  };

  return {
    getClass,
    getMargin,
    getPadding,
    getTextAlign,
    getPosition,
    getFlexDirection,
    getBorder,
    isRTL
  };
};

/**
 * Función para generar clases CSS dinámicas basadas en dirección
 */
export const generateRTLClass = (
  baseClass: string, 
  rtlClass: string, 
  isRTL: boolean
): string => {
  return isRTL ? rtlClass : baseClass;
};

/**
 * Configuración de Tailwind CSS para RTL
 * Agregar esto al tailwind.config.js:
 */
export const tailwindRTLConfig = {
  plugins: [
    // Plugin para soporte RTL
    function({ addUtilities }: any) {
      const newUtilities = {
        '.rtl': {
          direction: 'rtl',
        },
        '.ltr': {
          direction: 'ltr',
        },
      };
      addUtilities(newUtilities);
    }
  ],
  // Configuración de variantes RTL
  variants: {
    extend: {
      margin: ['rtl'],
      padding: ['rtl'],
      textAlign: ['rtl'],
      borderWidth: ['rtl'],
      borderRadius: ['rtl'],
    }
  }
};