export const getSlovakDay = (id) => {
    switch (id) {
      case 0:
        return "Nedela";
      case 1:
        return "Pondelok";
      case 2:
        return "Utorok";
      case 3:
        return "Streda";
      case 4:
        return "Stvrtok";
      case 5:
        return "Piatok";
      case 6:
        return "Sobota";
      default:
        return "null";
    }
  };
