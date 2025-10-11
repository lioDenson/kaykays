import { Links } from '@/pages/interface/general';

const CustomQuickLinks = ({ links }: { links?: Links[] }) => {
    return (
        <div className="grid w-full sticky bottom-0 flex-col ">
            <span className="px-2 py-0 font-bold text-accent capitalize">links</span>
            <div className="flex flex-wrap justify-end gap-4 bg-accent p-2">
                {links &&
                    links.map((link) => (
                        <div className="flex items-center gap-0.5 rounded border-b-2 border-foreground px-0.5 hover:border-accent">
                            <a
                                key={link.href}
                                href={link.href}
                                className="flex items-center gap-1 px-1 py-0.5 text-xs uppercase font-thin text-foreground no-underline hover:text-accent"
                            >
                                {link.icon && <link.icon className="h-3 w-3" />}
                                {link.label}
                            </a>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CustomQuickLinks;
