export const convertNumberToINR = (number) => {
    const absNumber = Math.abs(number); // Handle negative numbers gracefully
    const formattedNumber = absNumber.toLocaleString("en-IN");

    if (absNumber >= 1e12) {
        // Lakh Crores (1,00,00,00,00,000 and above)
        return `${(absNumber / 1e12).toFixed(2)}LCR`;
    } else if (absNumber >= 1e11) {
        // Thousand Crores (10,00,00,00,000 to 99,99,99,99,999)
        return `${(absNumber / 1e11).toFixed(2)}KCR`;
    } else if (absNumber >= 1e7) {
        // Crores (1,00,00,000 to 99,99,99,999)
        return `${(absNumber / 1e7).toFixed(2)}CR`;
    } else if (absNumber >= 1e5) {
        // Lakhs (1,00,000 to 99,99,999)
        return `${(absNumber / 1e5).toFixed(2)}L`;
    } else if (absNumber >= 1e3) {
        // Thousands (1,000 to 99,999)
        return `${(absNumber / 1e3).toFixed(2)}K`;
    } else {
        // Below Thousands
        return formattedNumber;
    }
};
