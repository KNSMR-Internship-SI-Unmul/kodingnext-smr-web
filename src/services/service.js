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

  getProjects: (filters = {}) => {
    const { search, module_id } = filters;
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (module_id) params.append("module_id", module_id);

    const queryString = params.toString();
    const endpoint = queryString ? `/student-projects?${queryString}` : "/student-projects";

    return apiClient(endpoint, { method: "GET" });
  },

  getPromotions: () => apiClient("/promotions", { method: "GET" }),
  getReviews: () => apiClient("/reviews", { method: "GET" }),
  getEvents: () => apiClient("/events", { method: "GET" }),
  getEmployees: () => apiClient("/employees", { method: "GET" }),
};