import { Info } from "~/common/svg";

type Props = {
  title: string;
  color?: string;
  iconColor: string;
  description: string;
  children: React.ReactNode;
};

const CustomAlert = ({
  title,
  color,
  iconColor,
  description,
  children,
}: Props) => {
  return (
    <div
      // TODO - Fix this
      className={`select-none rounded-md border border-${
        color || "zinc"
      }-200 bg-${color || "zinc"}-50 p-5`}
    >
      <div className="flex w-full flex-row gap-4">
        <Info
          className={`h-10 w-10`}
          style={{
            color: iconColor,
          }}
        />
        <div className="flex flex-col">
          <h2 className="mb-1 font-semibold">{title}</h2>
          <p className="text-sm text-zinc-600">{description}</p>
          <div className="mt-5 flex flex-row gap-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
