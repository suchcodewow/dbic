import { useFormContext } from "react-hook-form";

export const CustomCheckbox = ({ name, label, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div>
      <label className="flex gap-2 items-center cursor-pointer w-fit">
        <input {...props} {...register(name)} />
        {label}
      </label>

      <ErrorMessage error={error} />
    </div>
  );
};

export const CustomInput = ({ name, label, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  const id = `${name}-${props.type}-${label}`;

  return (
    <div className="w-full flex gap-1 flex-col">
      {label && (
        <label className="text-white text-sm" htmlFor={id}>
          {label}
        </label>
      )}

      <input className="py-1 px-2 rounded w-full text-black" {...register(name)} {...props} id={id} />

      <ErrorMessage error={error} />
    </div>
  );
};

export const CustomRadio = ({ name, label, options, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4">
        <label>{label}</label>
        <section className="flex justify-between flex-1">
          {options &&
            options.map(({ desc, value }) => (
              <label key={value} className="flex items-center gap-1 cursor-pointer hover:underline rounded p-1">
                <input {...register(name)} {...props} value={value} type="radio" />
                {desc}
              </label>
            ))}
        </section>
      </div>
      <ErrorMessage error={error} />
    </div>
  );
};

export const CustomSelect = ({ name, label, options, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;
  const id = `${name}-${props.type}-${label}`;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <label htmlFor={id}>{label}</label>
        <select {...register(name)} {...props} id={id} className="p-2 rounded flex-1 text-black">
          <option value="">--- Select option ---</option>
          {options &&
            options.map(({ desc, value }) => (
              <option key={value} value={value}>
                {desc}
              </option>
            ))}
        </select>
      </div>
      <ErrorMessage error={error} />
    </div>
  );
};

const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <div className="w-full grid place-content-end">
      <p className="text-red-400 text-sm">{error}</p>
    </div>
  );
};
