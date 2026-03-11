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
