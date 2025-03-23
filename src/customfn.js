export const formatDate = (isoString) => {
    const date = new Date(isoString);
  
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
  
    return date.toLocaleDateString("en-US", options);
  };