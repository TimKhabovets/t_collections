import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

export default function FormSelect({className, control, name, options, rules, error}) {
    return (
        <Controller
            
            name={name}
            render={({ field }) => (
                <Select
                className={className}
                    {...field}
                    options={options}
                />
            )}
            rules={rules}
            error={error}
            control={control}
            defaultValue=""
        />
    );
}
