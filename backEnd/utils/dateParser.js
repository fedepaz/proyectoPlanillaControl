export function parsestringDate(dateString) {
  if (!dateString || typeof dateString !== "string") return null;

  // Handle different date formats
  if (dateString.includes("/")) {
    const parts = dateString.split("/");
    if (parts.length !== 3) return null;
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    if (
      day < 1 ||
      day > 31 ||
      month < 1 ||
      month > 12 ||
      year < 1900 ||
      year > 2100
    ) {
      return null;
    }
    const date = new Date(year, month - 1, day);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return null;
    }
    return date.toLocaleDateString("es-ES");
  }

  // Handle ISO date format
  try {
    return new Date(dateString).toLocaleDateString("es-ES");
  } catch {
    return dateString;
  }
}
export function validateDateFormat(dateStr) {
  if (!dateStr) return true; // Optional parameter

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateStr)) return false;

  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date.getTime());
}

export function buildDateRangeQuery(fechaDesde, fechaHasta) {
  // Convert incoming dates to Date objects
  const startDate = new Date(fechaDesde);
  const endDate = new Date(fechaHasta);

  // Use aggregation to convert string dates and filter
  return [
    {
      $addFields: {
        parsedDate: {
          $let: {
            vars: {
              dateParts: { $split: ["$datosPsa.fecha", "/"] },
            },
            in: {
              $cond: {
                if: { $eq: [{ $size: "$$dateParts" }, 3] },
                then: {
                  $dateFromString: {
                    dateString: {
                      $concat: [
                        { $arrayElemAt: ["$$dateParts", 2] }, // year
                        "-",
                        {
                          $cond: {
                            if: {
                              $lt: [
                                {
                                  $strLenCP: {
                                    $arrayElemAt: ["$$dateParts", 1],
                                  },
                                },
                                2,
                              ],
                            },
                            then: {
                              $concat: [
                                "0",
                                { $arrayElemAt: ["$$dateParts", 1] },
                              ],
                            },
                            else: { $arrayElemAt: ["$$dateParts", 1] },
                          },
                        }, // month with padding
                        "-",
                        {
                          $cond: {
                            if: {
                              $lt: [
                                {
                                  $strLenCP: {
                                    $arrayElemAt: ["$$dateParts", 0],
                                  },
                                },
                                2,
                              ],
                            },
                            then: {
                              $concat: [
                                "0",
                                { $arrayElemAt: ["$$dateParts", 0] },
                              ],
                            },
                            else: { $arrayElemAt: ["$$dateParts", 0] },
                          },
                        }, // day with padding
                      ],
                    },
                    onError: null,
                  },
                },
                else: null,
              },
            },
          },
        },
      },
    },
    {
      $match: {
        parsedDate: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $project: {
        parsedDate: 0, // Remove the temporary field
      },
    },
  ];
}
