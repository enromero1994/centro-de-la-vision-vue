<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6" md="6" sm="12">
        <v-row>
          <v-col cols="12">
            <v-card elevation="2" height="80">
              <v-card-title>
                Agenda
                <v-spacer></v-spacer>

                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                      Agregar Agenda
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Agregar Agenda</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-select
                              v-model="professionalsSelect"
                              :items="professionals"
                              item-text="name"
                              item-value="id"
                              label="Profesionales"
                              persistent-hint
                              return-object
                              single-line
                              @change="getPractices"
                            ></v-select>
                          </v-col>
                          <v-col cols="12">
                            <v-select
                              v-model="practicesSelect"
                              :items="practices"
                              item-text="name"
                              item-value="id"
                              label="Practicas"
                              persistent-hint
                              return-object
                              single-line
                            ></v-select>
                          </v-col>
                          <v-col cols="12">
                            <v-menu
                              v-model="menu2"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="date"
                                  label="Fecha Agenda"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="date"
                                @input="menu2 = false"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col>
                            <v-dialog
                              ref="dialog"
                              v-model="modal2"
                              :return-value.sync="time"
                              persistent
                              width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="time"
                                  label="Hora Inicio Agenda"
                                  prepend-icon="mdi-clock-time-four-outline"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-time-picker
                                v-if="modal2"
                                v-model="time"
                                full-width
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="modal2 = false"
                                >
                                  Cancel
                                </v-btn>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="$refs.dialog.save(time)"
                                >
                                  OK
                                </v-btn>
                              </v-time-picker>
                            </v-dialog>
                          </v-col>
                          <v-col>
                            <v-dialog
                              ref="dialog2"
                              v-model="modal3"
                              :return-value.sync="time2"
                              persistent
                              width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="time2"
                                  label="Hora Fin Agenda"
                                  prepend-icon="mdi-clock-time-four-outline"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-time-picker
                                v-if="modal3"
                                v-model="time2"
                                full-width
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="modal3 = false"
                                >
                                  Cancel
                                </v-btn>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="$refs.dialog2.save(time2)"
                                >
                                  OK
                                </v-btn>
                              </v-time-picker>
                            </v-dialog>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model="intervalo"
                              type="number"
                              label="Intervalo (minutos)"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialog = false">
                        Cancelar
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="agregarAgenda">
                        Agregar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <div>
        <v-sheet tile height="54" class="d-flex">
          <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-select
            v-model="type"
            :items="types"
            dense
            outlined
            hide-details
            class="ma-2"
            label="type"
          ></v-select>
          <v-select
            v-model="mode"
            :items="modes"
            dense
            outlined
            hide-details
            label="event-overlap-mode"
            class="ma-2"
          ></v-select>
          <v-select
            v-model="weekday"
            :items="weekdays"
            dense
            outlined
            hide-details
            label="weekdays"
            class="ma-2"
          ></v-select>
          <v-spacer></v-spacer>
          <v-btn icon class="ma-2" @click="$refs.calendar.next()">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="value"
            :weekdays="weekday"
            :type="type"
            :events="getProfesionals"
            :event-overlap-mode="mode"
            :event-overlap-threshold="30"
            :event-color="getEventColor"
            @change="getEvents"
            @click:date="viewDay"
            @mousedown:event="startDrag"
            @mousedown:time="startTime"
            @mousemove:time="mouseMove"
            @mouseup:time="endDrag"
            @mouseleave.native="cancelDrag"
          >
            <template v-slot:event="{ event, timed, eventSummary }">
              <div class="v-event-draggable" v-html="eventSummary()"></div>
              <div
                v-if="timed"
                class="v-event-drag-bottom"
                @mousedown.stop="extendBottom(event)"
              ></div>
            </template>
          </v-calendar>
        </v-sheet>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import Agenda from "../../models/agenda";
export default {
  data: () => ({
    intervalo: 0,
    agenda: new Agenda(),
    //Time
    time: null,
    modal2: false,
    //Time 2
    time2: null,
    modal3: false,
    //Date
    date: null,
    //
    dataProfesionales: [],
    //
    professionalsSelect: { name: "asd", id: 1 },
    professionals: [],
    practicesSelect: { name: "test", id: 1 },

    practices: [],
    //
    dialog: false,
    type: "day",
    types: ["month", "week", "day", "4day"],
    mode: "stack",
    modes: ["stack", "column"],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
      { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
      { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
      { text: "Mon, Wed, Fri", value: [1, 3, 5] },
    ],
    value: "",
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
    test: [],
  }),
  created: function () {
    this.getProfessionals();
  },
  computed: {
    getProfesionals() {
      const profesionales =
        this.$store.state.admision.profesionales.data.profesionales;
      const events = [];
      console.log(profesionales)
      for (let index = 0; index < profesionales.length; index++) {
        if (profesionales[index].agenda.length > 0) {
          for (
            let index2 = 0;
            index2 < profesionales[index].agenda.length;
            index2++
          ) {
            events.push({
              name: profesionales[index].nombre,
              color: "blue",
              start: `${profesionales[index].agenda[index2].fecha} ${profesionales[index].agenda[index2].hora}`,
              end: `${profesionales[index].agenda[index2].fecha} ${profesionales[index].agenda[index2].hora}`,
            });
            // console.log(profesionales[index].agenda[index2])
            // console.log(`
            //   nombre : ${profesionales[index].nombre}
            //   fecha : ${profesionales[index].agenda[index2].fecha}
            //   hora : ${profesionales[index].agenda[index2].hora}
            //   `);
          }
        }
      }

      return events;
    },
  },
  methods: {
    agregarAgenda() {
      this.agenda.professional_id = this.professionalsSelect.id;
      this.agenda.practice_id = this.practicesSelect.id;
      this.agenda.hora_inicio = this.time;
      this.agenda.hora_fin = this.time2;
      this.agenda.fecha = this.date;
      this.agenda.intervalo = this.intervalo;
      // console.log(this.agenda);
      this.$store.dispatch("admision/agregarAgenda", this.agenda).then(
        (data) => {
          // console.log("data", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getProfessionals() {
      this.$store.dispatch("admision/buscarProfesionales").then(
        (data) => {
          let { profesionales } = data.data;
          // console.log(profesionales);
          this.dataProfesionales = profesionales;
          for (let index = 0; index < profesionales.length; index++) {
            const nombre = profesionales[index].nombre;
            const apellido = profesionales[index].apellido;
            const id = profesionales[index].id;

            this.professionals.push({
              name: `${nombre} ${apellido}`,
              id: id,
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getPractices() {
      this.practices = [];
      const result = this.dataProfesionales.filter(
        (professionals) => professionals.id == this.professionalsSelect.id
      );
      for (let index = 0; index < result[0].practicas.length; index++) {
        const name = result[0].practicas[index].description;
        const id = result[0].practicas[index].id;

        this.practices.push({
          name,
          id,
        });
      }
      console.log("practicas", this.practices);
    },
    getEvents({ start, end }) {
      const events = [];

      // const min = new Date(`${start.date}T00:00:00`).getTime();
      // const max = new Date(`${end.date}T23:59:59`).getTime();
      // const days = (max - min) / 86400000;
      // const eventCount = this.rnd(days, days + 20);

      // for (let i = 0; i < eventCount; i++) {
      //   const timed = this.rnd(0, 3) !== 0
      //   const firstTimestamp = this.rnd(min, max)
      //   const secondTimestamp = this.rnd(2, timed ? 8 : 288) * 900000
      //   const start = firstTimestamp - (firstTimestamp % 900000)
      //   const end = start + secondTimestamp

      //   events.push({
      //     name: this.rndElement(this.names),
      //     color: this.rndElement(this.colors),
      //     start,
      //     end,
      //     timed,
      //   })
      // }
      //     events.push({
      //   name: 'Test',
      //   color: 'blue',
      //   start : '2021-11-04 6:15:00',

      // })

      this.events = events;
    },

    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    rndElement(arr) {
      return arr[this.rnd(0, arr.length - 1)];
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },

    // DRAG AND DROP
    startDrag({ event, timed }) {
      if (event && timed) {
        this.dragEvent = event;
        this.dragTime = null;
        this.extendOriginal = null;
      }
    },
    startTime(tms) {
      const mouse = this.toTime(tms);

      if (this.dragEvent && this.dragTime === null) {
        const start = this.dragEvent.start;

        this.dragTime = mouse - start;
        console.log(start);
        console.log(this.dragTime);
      } else {
        this.createStart = this.roundTime(mouse);
        this.createEvent = {
          name: `Event #${this.events.length}`,
          color: this.rndElement(this.colors),
          start: this.createStart,
          end: this.createStart,
          timed: true,
        };

        this.events.push(this.createEvent);

        let startAgenda = new Date(this.createEvent.start);
        let endAgenda = new Date(this.createEvent.end);
        console.log(startAgenda, endAgenda);
        console.log("asd");
        startAgenda = startAgenda.toLocaleTimeString();
        endAgenda = endAgenda.toLocaleTimeString();
        console.log(tms.date, startAgenda, endAgenda);
      }
    },
    extendBottom(event) {
      this.createEvent = event;
      this.createStart = event.start;
      this.extendOriginal = event.end;
    },
    mouseMove(tms) {
      const mouse = this.toTime(tms);

      if (this.dragEvent && this.dragTime !== null) {
        const start = this.dragEvent.start;
        const end = this.dragEvent.end;
        const duration = end - start;
        const newStartTime = mouse - this.dragTime;
        const newStart = this.roundTime(newStartTime);
        const newEnd = newStart + duration;

        this.dragEvent.start = newStart;
        this.dragEvent.end = newEnd;
      } else if (this.createEvent && this.createStart !== null) {
        const mouseRounded = this.roundTime(mouse, false);
        const min = Math.min(mouseRounded, this.createStart);
        const max = Math.max(mouseRounded, this.createStart);

        this.createEvent.start = min;
        this.createEvent.end = max;
        //
      }
    },
    endDrag() {
      this.dragTime = null;
      this.dragEvent = null;
      this.createEvent = null;
      this.createStart = null;
      this.extendOriginal = null;
    },
    cancelDrag() {
      if (this.createEvent) {
        if (this.extendOriginal) {
          this.createEvent.end = this.extendOriginal;
        } else {
          const i = this.events.indexOf(this.createEvent);
          if (i !== -1) {
            this.events.splice(i, 1);
          }
        }
      }

      this.createEvent = null;
      this.createStart = null;
      this.dragTime = null;
      this.dragEvent = null;
    },
    roundTime(time, down = true) {
      const roundTo = 15; // minutes
      const roundDownTime = roundTo * 60 * 1000;

      return down
        ? time - (time % roundDownTime)
        : time + (roundDownTime - (time % roundDownTime));
    },
    toTime(tms) {
      return new Date(
        tms.year,
        tms.month - 1,
        tms.day,
        tms.hour,
        tms.minute
      ).getTime();
    },
  },
};
</script>

<style>
</style>