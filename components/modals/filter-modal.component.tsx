"use client";

import { MouseEventHandler, useState } from "react";
import Button from "../button/button.component";
import { ButtonStyle } from "../button/button.types";
import SelectBox from "../inputs/generic-select.component";
import RangeInput from "../inputs/range-input.component";
import StarInput from "../inputs/star-input.component";
import Switch from "../inputs/switch.component";
import styles from "./filter-modal.module.scss";

// TODO add onclicks for buttons
type Props = {
  onCancelButtonClick?: MouseEventHandler;
};

type FacultyState = {
  value: string;
  x?: number;
  y?: number;
};

const FilterModal = ({ onCancelButtonClick }: Props) => {
  const sortOptions = [
    { name: "Nazwa", value: "name" },
    { name: "Ocena", value: "rating" },
    { name: "Cena na osobę", value: "price" },
  ];

  const facultyOptions = [
    { name: "Wybierz", value: "none" },
    {
      name: "Wydział Administracji i Nauk Społecznych",
      value: "admin_social",
      x: 21.009993,
      y: 52.220656,
    },
    { name: "Wydział Architektury", value: "arch", x: 21.012836, y: 52.22219 },
    { name: "Wydział Chemiczny", value: "chemical", x: 21.00881, y: 52.221592 },
    {
      name: "Wydział Elektroniki i Technik Informacyjnych",
      value: "weiti",
      x: 21.011755,
      y: 52.219033,
    },
    {
      name: "Wydział Elektryczny",
      value: "electric",
      x: 52.221538,
      y: 21.00613,
    },
    { name: "Wydział Fizyki", value: "physics", x: 21.007222, y: 52.221425 },
    {
      name: "Wydział Geodezji i Kartografii",
      value: "geodesy_cartography",
      x: 21.009993,
      y: 52.220656,
    },
    {
      name: "Wydział Instalacji Budowlanych, Hydrotechniki i Inżynierii Środowiska",
      value: "building_hydrotechnics",
      x: 21.007624,
      y: 52.220423,
    },
    {
      name: "Wydział Inżynierii Chemicznej i Procesowej",
      value: "chemical_process",
      x: 21.015521,
      y: 52.213882,
    },
    {
      name: "Wydział Inżynierii Lądowej",
      value: "land_engineering",
      x: 21.011696,
      y: 52.217717,
    },
    {
      name: "Wydział Inżynierii Materiałowej",
      value: "material_engineering",
      x: 20.999427,
      y: 52.201308,
    },
    {
      name: "Wydział Matematyki i Nauk Informacyjnych",
      value: "mini",
      x: 21.006959,
      y: 52.222141,
    },
    {
      name: "Wydział Mechaniczny Energetyki i Lotnictwa",
      value: "mech_energy_aero",
      x: 21.005296,
      y: 52.221208,
    },
    {
      name: "Wydział Mechaniczny Technologiczny",
      value: "mech_tech",
      x: 21.002724,
      y: 52.203302,
    },
    { name: "Wydział Mechatroniki", value: "mech", x: 21.000881, y: 52.20293 },
    {
      name: "Wydział Samochodów i Maszyn Roboczych",
      value: "vehicles_machines",
      x: 21.002244,
      y: 52.204328,
    },
    {
      name: "Wydział Transportu",
      value: "transport",
      x: 21.008005,
      y: 52.221988,
    },
    {
      name: "Wydział Zarządzania",
      value: "management",
      x: 21.002721,
      y: 52.203297,
    },
  ];

  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [isOpen, setIsOpen] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [selectedSort, setSelectedSort] = useState("name");
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyState>({
    value: "none",
  });

  const handleFacultyChange = (value: string) => {
    const faculty = facultyOptions.find((f) => f.value === value);
    if (faculty) {
      setSelectedFaculty({ value: faculty.value, x: faculty.x, y: faculty.y });
    }
  };

  const clearFilters = () => {
    setPriceRange({ min: 0, max: 100 });
    setIsOpen(false);
    setMinRating(0);
    setSelectedSort("name");
    setSelectedFaculty({ value: "none" });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Filtry</h1>
        <span onClick={onCancelButtonClick}>
          <i className="fa-solid fa-xmark"></i>
        </span>
      </div>
      <div className={styles.filters}>
        <SelectBox
          label="Sortuj"
          options={sortOptions}
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
        ></SelectBox>
        <RangeInput
          value={priceRange}
          limit={{ min: 0, max: 100 }}
          onChange={setPriceRange}
          suffix=" zł"
          label="Cena na osobę"
        ></RangeInput>
        <div className={styles.rating}>
          <h3>Minimalna Ocena</h3>
          <StarInput
            value={minRating}
            max={5}
            onChange={setMinRating}
          ></StarInput>
        </div>
        <Switch
          label="Otwarte Teraz"
          checked={isOpen}
          onChange={setIsOpen}
        ></Switch>
        <SelectBox
          label="Wydział"
          options={facultyOptions}
          value={selectedFaculty.value}
          onChange={(e) => handleFacultyChange(e.target.value)}
        ></SelectBox>
      </div>
      <div className={styles.buttons}>
        <Button style={ButtonStyle.BACKDROP} onClick={clearFilters}>
          Wyczyść
        </Button>
        <Button>Zastosuj</Button>
      </div>
    </div>
  );
};

export default FilterModal;
