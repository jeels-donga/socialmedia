"use client";

import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const Posting = ({ post, apiEndpoint }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: post,
  });

  const router = useRouter();

  const handlePublish = async (data) => {
    try {
      const postForm = new FormData();

      postForm.append("creatorId", data.creatorId);
      postForm.append("caption", data.caption);
      postForm.append("tag", data.tag);

      if (typeof data.postPhoto !== "string") {
        postForm.append("postPhoto", data.postPhoto[0]);
      } else {
        postForm.append("postPhoto", data.postPhoto);
      }

      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: postForm,
      });

      if (response.ok) {
        router.push(`/profile/${data.creatorId}/posts`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg max-w-md mx-auto"
      onSubmit={handleSubmit(handlePublish)}
    >
      <label
        htmlFor="photo"
        className="flex flex-col items-center gap-3 text-light-1 cursor-pointer hover:scale-105 transition-transform"
      >
        {watch("postPhoto") ? (
          typeof watch("postPhoto") === "string" ? (
            <Image
              src={watch("postPhoto")}
              alt="post"
              width={250}
              height={200}
              className="object-cover rounded-lg"
            />
          ) : (
            <Image
              src={URL.createObjectURL(watch("postPhoto")[0])}
              alt="post"
              width={250}
              height={200}
              className="object-cover rounded-lg"
            />
          )
        ) : (
          <div className="flex flex-col items-center">
            <AddPhotoAlternateOutlined sx={{ fontSize: "100px", color: "white" }} />
            <p className="text-sm text-gray-400">Upload a photo</p>
          </div>
        )}
      </label>
      <input
        {...register("postPhoto", {
          validate: (value) => {
            if (
              typeof value === "null" ||
              (Array.isArray(value) && value.length === 0) ||
              value === "undefined"
            ) {
              return "A photo is required!";
            }
            return true;
          },
        })}
        id="photo"
        type="file"
        style={{ display: "none" }}
      />
      {errors.postPhoto && (
        <p className="text-sm text-red-500">{errors.postPhoto.message}</p>
      )}

      <div>
        <label
          htmlFor="caption"
          className="block mb-2 text-light-1 text-sm font-semibold"
        >
          Caption
        </label>
        <textarea
          {...register("caption", {
            required: "Caption is required",
            validate: (value) => {
              if (value.length < 3) {
                return "Caption must be more than 2 characters";
              }
            },
          })}
          type="text"
          rows={3}
          placeholder="What's on your mind?"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-light-1"
          id="caption"
        />
        {errors.caption && (
          <p className="text-sm text-red-500">{errors.caption.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="tag"
          className="block mb-2 text-light-1 text-sm font-semibold"
        >
          Tag
        </label>
        <input
          {...register("tag", { required: "Tag is required" })}
          type="text"
          placeholder="#tag"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-light-1"
        />
        {errors.tag && <p className="text-sm text-red-500">{errors.tag.message}</p>}
      </div>

      <button
        type="submit"
        className="py-3 rounded-lg mt-5 bg-pink-500 hover:bg-pink-600 transition-colors text-light-1 text-sm font-semibold shadow-md hover:shadow-lg"
      >
        Publish
      </button>
    </form>
  );
};

export default Posting;
