import { apiClient } from "./api";

export const service = {
  getCourses: () => apiClient("/courses", { method: "GET" }),
  getCourseById: (idOrSlug) => apiClient(`/courses/${idOrSlug}`, { method: "GET" }),
  getModules: (courseTypeId = null) => {
    const endpoint = courseTypeId
      ? `/modules?course_type_id=${courseTypeId}`
      : "/modules";
    return apiClient(endpoint, { method: "GET" });
  },
  getProjects: (courseTypeId = null) => {
    const endpoint = courseTypeId
      ? `/student-projects?course_type_id=${courseTypeId}`
      : "/student-projects";
    return apiClient(endpoint, { method: "GET" });
  },
  getPromotions: () => apiClient("/promotions", { method: "GET" }),
  getReviews: () => apiClient("/reviews", { method: "GET" }),
  getEvents: () => apiClient("/events", { method: "GET" }),
  getEmployees: () => apiClient("/employees", { method: "GET" }),
};
