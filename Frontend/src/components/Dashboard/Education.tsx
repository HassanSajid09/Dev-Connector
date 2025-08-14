import FormatDate from "../../utils/FormatDate";
import axios from "../../api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { Education } from "../Types/types";

const EducationItem = ({ education }: { education: Education[] }) => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const deleteEducation = async (id: string) => {
    const confirmed = confirm(
      "⚠️ Are you sure? This will delete your Education Credential Permanently!"
    );
    if (!confirmed) return;
    await axios.delete(`/profile/education/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Education Deleted!");
  };

  const { mutate: deleteEdu, isPending } = useMutation({
    mutationFn: deleteEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to Delete Education!");
    },
  });
  return (
    <>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Institite</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {education.map((edu: Education) => (
            <tr key={edu._id}>
              <td>{edu?.institute}</td>
              <td className="hide-sm">{edu?.degree}</td>
              <td className="hide-sm">
                {FormatDate(edu.from)} - {edu.to ? FormatDate(edu.to) : "Now"}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteEdu(edu._id)}
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

export default EducationItem;
