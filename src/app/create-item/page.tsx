  "use client";

  import { useState } from "react";
  import { useRouter } from "next/navigation";

  export default function CreateItemPage() {
    //Declare multiple variables to handle each form's field.
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState<string[]>([]); //So the user can add multiple tags.
    const [tagInput, setTagInput] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null); //So the user can see a preview for the uploaded images.
    const [suggestions, setSuggestions] = useState<string[]>([]);


    //A function to handle the change of file input and generate the URL of the preview of the image.
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      //If there is a file...
      if (file) {
        setImage(file);
        setPreview(URL.createObjectURL(file)); //A temporary image preview.
      }
    };

    //A function to handle the geolocation translation when the user clicked "use my location." 
    const handleLocation = () => {
        if (!navigator.geolocation) {
          return alert("Geolocation not supported");
        }
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const res = await fetch(
              `/api/location?lat=${latitude}&lng=${longitude}`
            );
            const json = await res.json();
            if (json.address) setLocation(json.address);
            else console.error("Reverse geocode error", json);
          } catch (e) {
            console.error("Reverse geocode fetch failed", e);
          }
        });
      };


      //A function to handle the autocompletion for the "Enter last seen location".
      const handleLocationChanges = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setLocation(val);
      
        if (val.length < 3) {
          setSuggestions([]);
          return;
        }
      
        try {
          const res = await fetch(`/api/places?input=${encodeURIComponent(val)}`);
          const { predictions } = await res.json();
          //Extract the words the user types from each prediction.
          setSuggestions(predictions.map((p: any) => p.description));
        } catch (err) {
          console.error("Places autocomplete failed", err);
          setSuggestions([]);
        }
      };
      

    //A function to handle submitting the form submission.
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const formInfo = new FormData();
      formInfo.append("title", title);
      formInfo.append("description", description);
      formInfo.append("tags", JSON.stringify(tags)); // This will send the tags as a JSON string.
      formInfo.append("location", location);

      //If there is an image to upload....
      if (image) formInfo.append("image", image);

      //Now send the form and submit it to API route.
      const res = await fetch("/api/items", {
        method: "POST",
        body: formInfo,
      });

      //If the form was submitted, then reset all the fields to add another item.
      if (res.ok) {
        setTitle("");
        setDescription("");
        setTags([]);
        setLocation("");
        setImage(null);
        setPreview(null);
        router.push("/show-items"); //Send user back to item list page.
      } else {
        console.error("Failed to submit item");
      }
    };

    //HTML to handle the look of the form.
    return (
      <div className="min-h-screen bg-[url('/uploads/doggybkg.png')] bg-repeat bg-red-700 flex items-center justify-center px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="form-font-oswald bg-black text-white p-10 rounded-[30px] w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/*The inputs of the left side of the form.*/}
          <div className="space-y-5">
            {/* Header of the form*/}
            <h1 className="text-4xl font-bold">Report a Lost Item</h1>

            <div>
              {/*Title and Info of the Item Name Input.*/}
              <label className="block mb-1 text-lg">Item Name</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the item's name"
                className="w-full p-3 text-white bg-transparent border border-white rounded-md placeholder-white focus:outline-none"
                required
              />
            </div>

            <div>
              {/*Title and Info for the Description Input.*/}
              <label className="block mb-1 text-lg">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description"
                className="w-full p-3 text-white bg-transparent border border-white rounded-md placeholder-white h-24 focus:outline-none"
                required
              />
            </div>

            <div className="md:col-span-2">
              {/*Title and Info for the Tags Input.*/}
              <label className="block mb-1 text-lg">Tags</label>
              <div className="flex flex-wrap gap-2 border border-white rounded-md p-2 bg-transparent text-white">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-white text-black px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => setTags(tags.filter((_, i) => i !== idx))}
                      className="text-red-600 font-bold hover:text-red-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {/*This is for inputting the tags dynammically.*/}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && tagInput.trim()) {
                      e.preventDefault();
                      if (!tags.includes(tagInput.trim())) {
                        setTags([...tags, tagInput.trim()]);
                      }
                      setTagInput("");
                    }
                  }}
                  placeholder="Add tags here"
                  className="bg-transparent placeholder-white text-white focus:outline-none"
                />
              </div>
            </div>

            {/*The input for the location.*/}
            <div className="relative grid grid-cols-2 gap-2">
            <input
                type="text"
                value={location}
                onChange={handleLocationChanges}
                placeholder="Enter the last seen location"
                className="w-full p-3 text-white bg-transparent border border-white rounded-md placeholder-white focus:outline-none"
              />
              {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white text-black rounded-md shadow mt-1 max-h-48 overflow-auto z-10">
              {suggestions.map((s, i) => (
              <li
              key={i}
              onClick={() => {
              setLocation(s);
              setSuggestions([]);
              }}
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
              >
            {s}
         </li>
        ))}
    </ul>
   )}

              {/*Clicking the Use Current Location Button.*/}
              <button
              type="button"
              onClick={handleLocation}
              className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-md text-black hover:bg-gray-300 transition"
              >
              {/*Image for the pinpoint on "Use my Current Location"*/}
              <img
              src="/uploads/pin.png"
              alt="pin icon"
              className="w-6 h-6"
              />
              Use my current location
              </button>
            </div>
          </div>

          {/*The side of the form for the image and upload button*/}
          <div className="space-y-4 flex flex-col justify-start pt-[60px]">
            <label className="block text-lg mb-1">Item Image</label>
            <div className="w-full h-78 bg-white/10 border-2 border-white rounded-md flex items-center justify-center overflow-hidden">
              {/*Contains the image preview before a user uploads a image.*/}
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="object-contain w-full h-full rounded-md"
                />
              ) : (
                <img
                  src="/uploads/uploads-placeholder.png"
                  alt="Upload icon"
                  className="h-60 opacity-60"
                />
              )}
            </div>
            {/*The upload button.*/}
            <label className="w-full bg-gray-200 text-black px-4 py-2 rounded-md font-semibold text-center cursor-pointer hover:bg-gray-300">
              Upload
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </label>
          </div>

          {/*The submit button which spans across teh whole form.*/}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#B7372F] hover:bg-red-800 text-white py-3 px-4 rounded-lg text-lg font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
