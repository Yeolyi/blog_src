state =
  A: [109, 89, 213, 77, 13, 189, 45, 137, 181, 149, 29, 345, 169, 9, 277, 261, 225, 301, 233, 157, 193, 121, 257, 285, 33, 201, 73, 153, 145, 101, 25, 273, 221, 217, 265, 241, 305, 321, 349, 317, 41, 69, 357, 245, 333, 65, 5, 313, 309, 129, 1, 229, 81, 353, 237, 117, 57, 281, 205, 253, 185, 329, 61, 249, 197, 173, 269, 337, 141, 17, 209, 97, 293, 85, 297, 341, 49, 125, 105, 133, 93, 325, 161, 21, 53, 113, 177, 165, 37, 289]
  #A: [65, 47, 63, 268, 163, 254, 168, 128, 357, 334, 206, 310, 26, 94, 313, 165, 8, 147, 30, 44, 57, 48, 200, 301, 203, 289, 339, 297, 56, 96, 312, 136, 247, 173, 295, 248, 125, 335, 344, 186, 132, 278, 219, 66, 19, 155, 244, 34, 161, 28, 332, 31, 74, 137, 123, 183, 250, 103, 52, 91, 6, 189, 181, 319, 164, 221, 58, 204, 145, 97, 267, 162, 7, 196, 89, 273, 338, 76, 149, 148, 263, 1, 336, 108, 43, 45, 304, 40, 87, 143, 133, 229, 307, 343, 309, 347, 359, 211, 119, 73, 284, 300, 355, 14, 236, 216, 228, 215, 174, 3, 82, 226, 160, 217, 286, 79, 265, 70, 158, 156, 42, 51, 182, 171, 50, 12, 98, 341, 185, 231, 227, 342, 348, 187, 178, 349, 153, 260, 68, 169, 255, 345, 198, 201, 134, 21, 179, 253, 305, 167, 22, 311, 241, 242, 78, 99, 212, 340, 67, 245, 333, 317, 112, 188, 285, 192, 117, 290, 100, 59, 104, 170, 135, 113, 224, 41, 69, 326, 116, 240, 139, 225, 259, 109, 292, 331, 308, 214, 129, 288, 251, 2, 207, 20, 283, 194, 101, 193, 291, 110, 37, 27, 93, 232, 321, 269, 262, 77, 121, 114, 353, 328, 105, 80, 246, 177, 17, 150, 306, 138, 282, 235, 141, 16, 13, 252, 81, 191, 29, 238, 10, 271, 131, 239, 237, 115, 18, 60, 61, 53, 75, 314, 102, 275, 272, 62, 218, 72, 274, 197, 95, 176, 64, 9, 358, 323, 296, 287, 38, 33, 5, 83, 49, 337, 111, 88, 315, 303, 23, 354, 256, 166, 151, 264, 352, 294, 195, 243, 120, 234, 107, 360, 124, 233, 25, 257, 220, 106, 270, 55, 320, 122, 172, 11, 85, 327, 86, 351, 249, 54, 127, 126, 279, 35, 293, 32, 159, 24, 199, 280, 175, 209, 154, 144, 299, 92, 350, 39, 15, 4, 316, 276, 322, 140, 71, 261, 302, 210, 277, 36, 90, 330, 157, 325, 230, 152, 329, 222, 258, 84, 223, 208, 46, 213, 324, 184, 118, 202, 142, 266, 356, 318, 281, 205, 180, 298, 190, 346, 130, 146]#.sort((a,b) -> b-a)

Act = (none:0, focus_in:1, focus_out:2, merge:3)

merge_sort = (A, l, r, temp, parent_range) ->
  if 1 < r - l
    yield (act:Act.focus_in, from:parent_range, to:[l,r], msg:"Recurse into A[#{l}:#{r}]")
    c = (r + l) // 2
    # recurse to the left
    yield from merge_sort(A,l,c,temp,[l,r])
    # recurse to the right
    yield from merge_sort(A,c,r,temp,[l,r])
    # merge sorted sides
    swaps = (s for s from merge(A,l,c,r,temp))
    yield (act:Act.merge, swaps:swaps, msg:"Merged A[#{l}:#{c}] with A[#{c}:#{r}]")
    yield (act:Act.focus_out, to:parent_range, from:[l,r], msg:"Return from A[#{l}:#{r}]")
  #else
    #yield (act:Act.none, msg:"Base Case index #{l}")
  true

merge = (A, l, c, r, temp) ->
  [t, p1, p2] = [l, l, c] # O(1) initialize pointers
  # merge while both sides not empty
  while p1 < c and p2 < r # O(k) fill temp storage
    if A[p1] <= A[p2]     # O(1) check side
      yield [p1,t]
      temp[t] = A[p1]     # O(1) merge from left
      p1 += 1             # O(1) increment left pointer
    else
      yield [p2,t]
      temp[t] = A[p2]     # O(1) merge from right
      p2 += 1             # O(1) increment right pointer
    t += 1                # O(1) increment temp pointer
  # copy remaining left side
  while p1 < c            # O(k) fill temp storage
    yield [p1,t]
    temp[t] = A[p1]       # O(1) merge from left
    p1 += 1               # O(1) increment left pointer
    t += 1                # O(1) increment temp pointer
  # copy remaining right side
  while p2 < r            # O(k) fill temp storage
    yield [p2,t]
    temp[t] = A[p2]       # O(1) merge from right
    p2 += 1               # O(1) increment right pointer
    t += 1                # O(1) increment temp pointer
  A[l...r] = temp[l...r]  # O(k) copy back to array
  true

merge_sort_start = (A) ->
  yield (msg:"Start!")
  temp = []
  temp.length = A.length
  yield from merge_sort(A, 0, A.length, temp, null)

max = (A) -> return A.reduce((a,b) -> Math.max(a,b))
min = (A) -> return A.reduce((a,b) -> Math.min(a,b))
Color = net.brehaut.Color

init_draw_array = (draw, A) ->
  # setup dimensions of bars representing A
  bar_width = 800 // A.length
  max_bar_height = 360
  [Amin,Amax] = [min(A), max(A)]
  # create bars
  bar_group = draw.group()
  bars = (bar_group.rect(bar_width, v) for v in A)
  # place and color bars
  red = Color(hue: 0, saturation: 1, value: 1)
  for bar,i in bars
    v = A[i]
    bar.focus_color = red.shiftHue(v * 7/8).toCSS()
    bar.hazy_color = red.shiftHue(v * 7/8).desaturateByAmount(0.75).toCSS()
    bar.fill(bar.focus_color)
       .stroke(opacity:0)
       .move(i * bar_width, max_bar_height - bar.height())
  # setup lines to show recursion
  rec_lines =
    spacing: 6
    depth: 0
    max_depth: Math.ceil(Math.log(A.length) / Math.log(2))
  rec_lines.lines = [draw.line(0, max_bar_height, A.length * bar_width, max_bar_height).stroke(opacity:0)]
  rec_lines.rec_call = (l,r) ->
    rec_lines.depth++
    if rec_lines.depth == rec_lines.lines.length
      # create new line
      y = rec_lines.lines[rec_lines.depth-1].y() + rec_lines.spacing
      line = draw.line(l * bar_width, y, r * bar_width, y).stroke(color:'#000',width:3)
      rec_lines.lines.push(line)
    else
      # move old line
      line = rec_lines.lines[rec_lines.depth]
      line.show().x(l * bar_width).width((r-l) * bar_width)
  rec_lines.rec_return = () ->
    line = rec_lines.lines[rec_lines.depth]
    line.hide()
    rec_lines.depth--
  # setup initial viewbox
  canvas_width = 8 + bar_width * A.length
  canvas_height = 8 + max_bar_height + rec_lines.spacing * rec_lines.max_depth
  set_viewbox = (draw, l, r) ->
    draw.viewbox(x:-4 + l*bar_width, y:-4, width: canvas_width - (A.length - (r-l)) * bar_width, height: canvas_height)
  set_viewbox(draw, 0, A.length)
  draw.size(canvas_width, canvas_height)
  # return info
  return (bars:bars, rec_lines:rec_lines, bar_width:bar_width, max_bar_height:max_bar_height)

dur_index = 0
durations = [
  (merge:500, focus:75),
  (merge:250, focus:50),
  (merge:50, focus:25)
]
window.toggle_turbo = () ->
  dur_index = (dur_index + 1) % durations.length

recolor_bars = (bars, l, r) ->
  for bar,i in bars
    if l <= i and i < r
      bar.animate(duration:durations[dur_index].focus)
         .fill(bar.focus_color)
    else
      bar.animate(duration:durations[dur_index].focus)
         .fill(bar.hazy_color)

permute_bars = (bars, swaps, src, dest) ->
  # get bars
  moved_bars = (bars[swap[src]] for swap in swaps)
  for bar,i in moved_bars
    swap = swaps[i]
    # move bar
    bar.animate(duration:durations[dur_index].merge)
       .x(swap[dest] * bar.width())
    # put bar at new index
    bars[swap[dest]] = bar

do_step = (draw, info, step) ->
  switch step.act
    when Act.none then true
    when Act.focus_in
      recolor_bars(info.bars, step.to[0], step.to[1])
      info.rec_lines.rec_call(step.to[0], step.to[1])
    when Act.focus_out
      if step.to?
        recolor_bars(info.bars, step.to[0], step.to[1])
      info.rec_lines.rec_return()
    when Act.merge
      permute_bars(info.bars, step.swaps, 0, 1)
  return true

undo_step = (draw, info, step) ->
  switch step.act
    when Act.none then true
    when Act.focus_in
      if step.from?
        recolor_bars(info.bars, step.from[0], step.from[1])
      info.rec_lines.rec_return()
    when Act.focus_out
      recolor_bars(info.bars, step.from[0], step.from[1])
      info.rec_lines.rec_call(step.from[0], step.from[1])
    when Act.merge
      permute_bars(info.bars, step.swaps, 1, 0)
  return true

# autorun controls
autorun = 0
autorun_dur = () -> Math.max(durations[dur_index].merge, durations[dur_index].focus)
buttons_edit_playing = () ->
  document.getElementById("play_button").innerHTML = "Pause"
  document.getElementById("rewind_button").innerHTML = "Rewind"
buttons_edit_rewinding = () ->
  document.getElementById("play_button").innerHTML = "Play"
  document.getElementById("rewind_button").innerHTML = "Pause"
buttons_edit_stopped = () ->
  document.getElementById("play_button").innerHTML = "Play"
  document.getElementById("rewind_button").innerHTML = "Rewind"
# start/stop play
window.click_play = () ->
  switch autorun
    when 0 # paused
      autorun = 1
      buttons_edit_playing()
      autorun_loop()
    when 1 # already playing
      autorun = 0
    when -1 # rewinding
      autorun = 1
      buttons_edit_playing()
# start/stop rewind
window.click_rewind = () ->
  switch autorun
    when 0 # paused
      autorun = -1
      buttons_edit_rewinding()
      autorun_loop()
    when 1 # playing
      autorun = -1
      buttons_edit_rewinding()
    when -1 # already rewinding
      autorun = 0
# loop
autorun_loop = () ->
  dur = autorun_dur()
  if autorun == 1 and window.click_next()
    state.draw.animate(duration:dur).after(() -> autorun_loop())
  else if autorun == -1 and window.click_prev()
    state.draw.animate(duration:dur).after(() -> autorun_loop())
  else
    autorun = 0
    buttons_edit_stopped()
  true

window.click_next = () ->
  if state.t + 1 < state.steps.length
    state.t++
    do_step(state.draw, state.info, state.steps[state.t])
    document.getElementById("msg").innerHTML = state.steps[state.t].msg

window.click_prev = () ->
  if state.t > 0
    undo_step(state.draw, state.info, state.steps[state.t])
    state.t--
    document.getElementById("msg").innerHTML = state.steps[state.t].msg

main = () ->
  state.draw = SVG('drawing')
  state.info = init_draw_array(state.draw, state.A)
  state.steps = (s for s from merge_sort_start(state.A))
  state.t = 0
  state.draw.attr(preserveAspectRatio: "none")
  document.getElementById("msg").innerHTML = state.steps[state.t].msg

SVG.on(document, 'DOMContentLoaded', main)