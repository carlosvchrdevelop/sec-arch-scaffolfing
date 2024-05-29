export interface CustomStyles {
  navLinkColor: string;
  navLinkColorHover: string;
  navLinkUnderline: string;
  navLinkFontSize: string;
  pageMaxWidth: string;
  pageBgColor: string;
}

const light: CustomStyles = {
  // Nav
  navLinkColor: "text-blue-700",
  navLinkUnderline: "border-blue-700",
  navLinkColorHover: "text-blue-900",
  navLinkFontSize: "text-lg",
  // Page
  pageMaxWidth: "max-w-[1200px]",
  pageBgColor: "bg-white",
};

// const dark: CustomStyles = {};

export const styles: CustomStyles = light;
