import { validateProspect } from "../prospect-helpers";

describe("prospect creation validation", () => {
  test("rejects a blank company name", () => {
    const result = validateProspect({
      companyName: "",
      roleTitle: "Software Engineer",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Company name is required");
  });

  test("rejects a blank role title", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Role title is required");
  });
});

describe("salary validation", () => {
  test("accepts a plain numeric salary", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "PM",
      salary: "120000",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts salary with commas", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "PM",
      salary: "120,000",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts salary with dollar sign", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "PM",
      salary: "$120,000",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts salary with decimals", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "PM",
      salary: "120000.50",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts empty salary", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "PM",
      salary: "",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts null salary", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "PM",
      salary: null,
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts undefined salary", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "PM",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("rejects non-numeric salary", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "PM",
      salary: "abc",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Salary must be a numeric value");
  });

  test("rejects salary with letters mixed in", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "PM",
      salary: "120k",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Salary must be a numeric value");
  });

  test("rejects non-string salary", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "PM",
      salary: 120000,
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Salary must be a numeric value");
  });
});

describe("interview date validation", () => {
  test("accepts valid interview dates", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "PM",
      interviewDates: ["2026-03-15T10:00", "2026-03-20T14:30"],
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts an empty array of interview dates", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "PM",
      interviewDates: [],
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts null interview dates", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "PM",
      interviewDates: null,
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts undefined interview dates", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "PM",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("rejects non-array interview dates", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "PM",
      interviewDates: "2026-03-15T10:00",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Interview dates must be an array");
  });

  test("rejects invalid date strings in the array", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "PM",
      interviewDates: ["not-a-date"],
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Each interview date must be a valid date-time string");
  });

  test("rejects non-string values in the array", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "PM",
      interviewDates: [12345],
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Each interview date must be a valid date-time string");
  });

  test("rejects array with mix of valid and invalid dates", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "PM",
      interviewDates: ["2026-03-15T10:00", "garbage"],
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Each interview date must be a valid date-time string");
  });

  test("accepts a single valid interview date", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "PM",
      interviewDates: ["2026-04-01T09:00"],
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});
