import FormatDate from "../../utils/FormatDate";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Experience } from "../Types/types";

const ExperienceItem = ({ experience }: { experience: Experience[] }) => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const deleteExperience = async (id: string) => {
    const confirmed = confirm(
      "⚠️ Are you sure? This will delete your Experience Credential Permanently!"
    );
    if (!confirmed) return;
    await axios.delete(`/profile/experience/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Experience Deleted!");
  };

  const { mutate: deleteExp, isPending } = useMutation({
    mutationFn: deleteExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to Delete Experience!");
    },
  });
  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {experience?.map((exp) => (
            <tr key={exp._id}>
              <td>{exp?.company}</td>
              <td className="hide-sm">{exp?.title}</td>
              <td className="hide-sm">
                {FormatDate(exp.from)} - {exp.to ? FormatDate(exp.to) : "Now"}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteExp(exp._id)}
                  disabled={isPending}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ExperienceItem;
